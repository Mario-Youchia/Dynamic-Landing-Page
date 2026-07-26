# Dynamic Landing Page

A responsive landing page whose navigation and active-section states are generated dynamically from the document structure.

## Features

- Navigation generated from `section[data-nav]` elements
- Smooth scrolling to sections
- Active section and navigation-link highlighting
- Navigation that hides after inactivity and reappears during interaction
- Return-to-top control
- Responsive layout

## Run locally

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

## Screenshot

![Dynamic landing page](docs/screenshots/landing-page.png)

## Project history

The archive contained the Udacity starter version and several submissions. Version 1.2 had the most complete documentation. The final repository keeps its layout and course license while replacing hard-coded section counts, implicit global events, and ineffective timer handling with a dynamic implementation.
