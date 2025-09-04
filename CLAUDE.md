# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "imgmeasure" - a client-side image measurement application built with vanilla HTML, CSS, and JavaScript. The application allows users to upload images and measure distances on them by drawing line segments, with the ability to set reference scales for accurate measurements.

## Application Architecture

### Core Files Structure
- `main.html` - Primary application interface with Bootstrap-based layout
- `main.js` - Main application logic (image handling, measurement, interaction)
- `main.css` - Application-specific styles
- `bootstrap.min.css` / `bootstrap.bundle.min.js` - Bootstrap framework files

### Key Components

**Canvas-based Drawing System (`main.js`)**:
- Image loading and scaling (`loadImage`, `resizeCanvas`)
- Interactive line segment creation via mouse clicks
- Zoom and pan functionality for detailed measurements
- Segment selection, dragging, and deletion
- Real-time distance calculation with reference scaling

**User Interface (`main.html`)**:
- File upload for image input
- Scale configuration controls (pixel reference vs real-world measurements)
- Segment manipulation buttons (delete, delete all)
- Pan/zoom controls with directional buttons
- Real-time measurement display for selected segments

**Key Variables and State**:
- `segments[]` - Array of measurement line segments
- `scaleFactor` - Image scaling for canvas fitting
- `zoomFactor` - User zoom level
- `imgX/imgY` - Pan offsets for image positioning
- `selectedSegment` - Currently selected segment for manipulation

## Development Workflow

**Running the Application**:
Since this is a pure client-side application, simply open `main.html` in a web browser. No build process or server required.

**Core Functionality Flow**:
1. User uploads image → `loadImage()` resizes canvas and resets state
2. User clicks canvas twice → Creates new segment in `segments[]` array
3. User clicks existing segment → Selects segment and shows measurement
4. Zoom/pan controls → Updates `zoomFactor` and `imgX/imgY` for navigation

**Measurement Logic**:
- Distance calculated in pixels between segment endpoints
- Converted to real-world units using scale ratio: `realDistance = pixelDistance / scale * realValue`
- Selected segment displays measurement with background label

## Key Implementation Details

**Coordinate System Handling**:
The application manages multiple coordinate transformations:
- Original image coordinates
- Canvas coordinates (scaled by `scaleFactor`)
- Display coordinates (affected by zoom and pan)

**Interactive Features**:
- Segment selection via proximity detection (`isNearSegment`)
- Drag-to-move functionality for segments
- Visual feedback with color changes (red for normal, blue for selected)