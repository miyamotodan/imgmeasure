# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "imgmeasure" - a client-side image measurement application built with vanilla HTML, CSS, and JavaScript. The application allows users to upload images and measure distances on them by drawing line segments or rectangles, with the ability to set reference scales for accurate measurements. The app features a modern, mobile-first responsive design with multi-touch support, multiple color themes, and real-time visual feedback.

## Application Architecture

### Core Files Structure
- `index.html` - Primary application interface with Bootstrap-based layout
- `main.js` - Main application logic (image handling, measurement, interaction)
- `main.css` - Application-specific styles with CSS variables for theming
- `bootstrap.min.css` / `bootstrap.bundle.min.js` - Bootstrap 5 framework files

### Key Components

**Canvas-based Drawing System (`main.js`)**:
- Image loading and adaptive scaling (`loadImage`, `resizeCanvas`)
- Dual drawing modes: single segments and rectangles (4 segments)
- Real-time preview system with toggle (`showPreview`, `previewPoint`)
- Zoom and pan functionality for detailed measurements
- Multi-touch gesture support (pinch-to-zoom, single-finger pan)
- Segment selection with auto-reference setting
- Real-time distance calculation with reference scaling
- Visual feedback with touch indicators and crosshairs

**User Interface (`index.html`)**:
- Responsive toolbar with icon-based controls
- File upload for image input
- Drawing mode switcher (segment/rectangle)
- Preview toggle button
- Theme selector (light/dark/high-contrast)
- Scale configuration controls (pixel reference vs real-world measurements)
- Offcanvas settings panel with:
  - Scale configuration inputs
  - Editable segments list with inline name editing
  - Segment counter badge
- Status bar showing zoom level and current measurement
- Toast notifications for user feedback
- Help modal with comprehensive user guide and donation section
- Confirmation modal for destructive actions

**Key Variables and State**:
- `segments[]` - Array of measurement line segments with id, name, start, end
- `points[]` - Temporary array for current segment being drawn
- `selectedSegment` - Currently selected segment for manipulation
- `scaleFactor` - Image scaling for canvas fitting
- `zoomFactor` - User zoom level (0.5x to 5x)
- `imgX/imgY` - Final image position (centerX/Y + panX/Y)
- `centerX/centerY` - Centering offsets for image
- `panX/panY` - Pan offsets from center
- `drawingMode` - Current mode ('segment' or 'rectangle')
- `showPreview` - Toggle for real-time drawing preview
- `previewPoint` - Current mouse/touch position for preview rendering
- `currentTheme` - Active theme ('light', 'dark', 'contrast')
- `segmentCounter` - Auto-incrementing ID counter for segments

**Touch and Mouse Interaction**:
- `touches[]` - Array of active touch points
- `isPanning` - Flag for single-touch pan gesture
- `isMultiTouch` - Flag for multi-touch gestures (zoom)
- `isMousePanning` - Flag for right-click pan on desktop
- `lastClickTime` - Timestamp for debouncing click/touch events

## Development Workflow

**Running the Application**:
Since this is a pure client-side application, simply open `index.html` in a web browser. No build process or server required.

**Core Functionality Flow**:
1. User uploads image → `loadImage()` resizes canvas and resets state
2. User selects drawing mode (segment or rectangle)
3. User clicks/taps canvas:
   - First click: Creates first point, deselects current segment, shows preview if enabled
   - Mouse move / touch drag: Updates preview rendering
   - Second click: Creates segment(s) and selects the new segment
   - Click on existing segment: Selects it and auto-fills pixel reference
4. Zoom/pan controls:
   - Desktop: Right-click drag to pan, buttons to zoom
   - Mobile: Single-finger drag to pan, pinch to zoom, double-tap to reset
5. User sets scale reference by selecting a segment and entering real-world measurement
6. All measurements update in real-time based on scale ratio

**Drawing Modes**:
- **Segment Mode**: Creates a single line segment between two points
- **Rectangle Mode**: Creates 4 connected segments forming a rectangle, named as "Rett{N} - [Side]"

**Measurement Logic**:
- Distance calculated in pixels using Euclidean distance: `Math.sqrt(dx² + dy²)`
- Converted to real-world units using scale ratio: `realDistance = pixelDistance * (realMm / referencePx)`
- Selected segment displays measurement with floating label offset from line
- Segment selection auto-fills the reference pixel input with segment length

**Theme System**:
- Three themes with CSS custom properties:
  - **Light**: Red segments, blue selected, light canvas background
  - **Dark** (default): Cyan segments, magenta selected, dark canvas background
  - **High Contrast**: Yellow segments, magenta selected, black background, max opacity
- Theme preference saved to localStorage
- Each theme defines colors for:
  - Segments (normal and selected states)
  - Preview shapes (stroke and fill)
  - Temporary points
  - Label backgrounds and text

## Key Implementation Details

**Coordinate System Handling**:
The application manages complex coordinate transformations across 4 systems:
1. **Client coordinates** (mouse/touch event positions)
2. **Canvas CSS coordinates** (affected by responsive scaling)
3. **Canvas logical coordinates** (affected by zoom via ctx.scale())
4. **Image original coordinates** (stored in segments, affected by scaleFactor)

The `getCanvasCoordinates()` function handles all conversions:
```javascript
// CSS → Canvas → Logical → Image
canvasX = rawCanvasX * (canvas.width / rect.width)
logicalX = canvasX / zoomFactor
imageX = (logicalX - imgX) / scaleFactor
```

**Interactive Features**:
- Segment selection via proximity detection (`distanceToSegment` with 15px threshold)
- Visual feedback with color changes using CSS variables
- Floating measurement labels positioned perpendicular to segment midpoint
- Editable segment names with inline contenteditable
- Touch indicator animations for tactile feedback
- Keyboard support: ESC to cancel current drawing
- Click cooldown (100ms) to prevent duplicate events from touch/mouse overlap

**Preview System**:
- Real-time rendering during drawing shows shape before confirmation
- Segment preview: Dashed line from first point to current position
- Rectangle preview: Semi-transparent filled rectangle with dashed border
- Toggle button to enable/disable preview (useful for complex images)
- Preview updates on mousemove/touchmove when first point is placed

**Responsive Design**:
- Mobile-first CSS with breakpoints at 768px, 1200px
- Canvas adapts to viewport size with padding adjustments
- Offcanvas width changes based on screen size (300px → 400px)
- Status bar font sizing and navbar padding scale with viewport
- Touch-optimized hit targets (15px threshold vs desktop)

**Event Handling Architecture**:
- Unified `handlePointCreation()` centralizes click/tap logic
- Prevents duplicate events via timestamp comparison
- Blocks input during gestures (isPanning, isMultiTouch, isMousePanning)
- Separate handlers for mouse (desktop pan) and touch (mobile gestures)
- Preview rendering in mousemove/touchmove handlers when applicable

## Feature Checklist

### Core Drawing Features
- ✅ Single segment creation (two-click)
- ✅ Rectangle creation (4 segments with one click)
- ✅ Real-time preview with toggle
- ✅ Dual drawing mode system

### Measurement System
- ✅ Pixel distance calculation (Euclidean)
- ✅ Real-world distance conversion with scale ratio
- ✅ Auto-fill reference when selecting segment
- ✅ Real-time measurement updates
- ✅ Floating labels on selected segments

### User Interface
- ✅ Responsive navbar toolbar
- ✅ Offcanvas settings panel
- ✅ Editable segment names (contenteditable)
- ✅ Segment list with select/delete buttons
- ✅ Status bar with zoom and measurement display
- ✅ Toast notifications
- ✅ Confirmation modals for destructive actions
- ✅ Help modal with user guide

### Navigation & Interaction
- ✅ Zoom in/out buttons (0.5x - 5x range)
- ✅ Reset view button
- ✅ Right-click drag pan (desktop)
- ✅ Single-finger pan (mobile)
- ✅ Pinch-to-zoom (mobile)
- ✅ Double-tap reset (mobile)
- ✅ Touch indicators and visual feedback

### Theming
- ✅ Light theme
- ✅ Dark theme (default)
- ✅ High-contrast theme
- ✅ Theme persistence (localStorage)
- ✅ CSS custom properties for colors
- ✅ Dynamic canvas color updates

### Mobile Optimization
- ✅ Touch event handling (touchstart/move/end)
- ✅ Multi-touch gesture recognition
- ✅ Viewport meta tag (user-scalable=no)
- ✅ Responsive canvas sizing
- ✅ Mobile-first CSS
- ✅ Orientation change handling

### Quality of Life
- ✅ ESC key to cancel current drawing
- ✅ Click on first point deselects segment
- ✅ Event debouncing (100ms cooldown)
- ✅ Segment counter badge
- ✅ Delete all with confirmation
- ✅ Upload button in toolbar

## Function Reference

### Core Drawing Functions (`main.js`)
- `loadImage(event)` - Loads image from file input, resets canvas state
- `resizeCanvas()` - Adapts canvas to viewport, calculates scaleFactor and centering
- `drawCanvas()` - Master render function, draws image, segments, preview
- `drawSegment(segment)` - Renders single segment with control points and labels
- `drawControlPoint(x, y, isSelected)` - Renders circular control points at endpoints
- `drawTemporaryPoints()` - Renders first point before second click
- `drawSegmentPreview()` - Renders dashed preview line during drawing
- `drawRectanglePreview()` - Renders semi-transparent rectangle preview
- `drawMeasurementLabel(segment, x1, y1, x2, y2)` - Renders floating measurement label

### Coordinate System (`main.js`)
- `getCanvasCoordinates(clientX, clientY)` - Converts mouse/touch to image coordinates
- `getDistance(touch1, touch2)` - Calculates distance between two touch points (for pinch)

### Segment Management (`main.js`)
- `addPoint(x, y)` - Adds point to points[] array, creates segment if 2 points
- `createSegment()` - Creates segment(s) based on drawingMode, updates UI
- `selectSegment(x, y)` - Finds and selects nearest segment, auto-fills reference
- `deleteSegment(segment)` - Deletes single segment with confirmation
- `deleteAllSegments()` - Deletes all segments with confirmation
- `cancelCurrentDrawing()` - Cancels in-progress drawing (ESC key)

### Measurement Calculation (`main.js`)
- `getPixelDistance(point1, point2)` - Returns Euclidean distance in pixels
- `calculateDistance(point1, point2)` - Converts pixel distance to real-world mm
- `distanceToSegment(x, y, segment)` - Returns perpendicular distance to segment line

### UI Updates (`main.js`)
- `updateMeasurement()` - Updates UI with selected segment measurement
- `updateSegmentsList()` - Rebuilds segment list in offcanvas panel
- `createSegmentListItem(segment, index)` - Creates single list item element
- `updateZoomLevel()` - Updates zoom percentage in status bar

### Navigation (`main.js`)
- `zoomIn()` - Increases zoom by 0.2x (max 5x)
- `zoomOut()` - Decreases zoom by 0.2x (min 0.5x)
- `resetView()` - Resets zoom to 1x and recenters image

### Event Handlers (`main.js`)
- `handleCanvasClick(event)` - Desktop click handler
- `handlePointCreation(clientX, clientY)` - Unified click/tap logic with debouncing
- `handleMouseDown/Move/Up(event)` - Desktop pan handlers (right-click)
- `handleTouchStart/Move/End(event)` - Mobile gesture handlers
- `handleDoubleTap()` - Double-tap reset for mobile

### Theming (`main.js`)
- `setTheme(theme)` - Applies theme, saves to localStorage, redraws canvas
- `loadThemeFromStorage()` - Loads saved theme on app init

### UI Feedback (`main.js`)
- `showToast(message, type)` - Displays Bootstrap toast notification
- `showConfirmModal(message, onConfirm)` - Displays confirmation modal
- `showTouchFeedback(x, y)` - Animates touch indicator circle
