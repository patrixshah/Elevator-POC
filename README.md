# Elevators POC

## Overview

This project is a Proof of Concept (POC) for an elevator system designed for a building with 10 floors (including the ground floor) and 5 elevators. The system includes features for calling elevators, managing elevator movement, and handling elevator arrival.

## Features

### Base

1. **Building Setup:**

   - The building consists of 10 floors, including the ground floor.
   - There are 5 elevators in the building.

2. **Elevator Call System:**
   - Each floor has a green button that allows users to call an elevator.

### Elevator Call Process

3. **Calling an Elevator:**

   - When an elevator is called, the "call" button changes to red and the text updates to "waiting".
   - The system identifies the closest available elevator and sends it to the calling floor.
   - The system can handle scenarios where all elevators are occupied and ensures no calls are missed, possibly using a queue.

4. **Elevator Movement:**
   - The elevator should move smoothly towards the selected floor.
   - The system measures the time it takes for the elevator to reach the designated floor.
   - Once the elevator is moving, it changes color to red.

### Elevator Arrival

5. **Elevator Reached the Floor:**
   - A sound plays when the elevator reaches the floor.
   - The elevator color changes to green upon arrival.
   - The system waits for 2 seconds before processing the next call (if any).
   - The button text changes to "arrived," and the button design updates according to the specified design.
   - After 2 seconds, the elevator color changes back to black, and the button resets to "call" with the initial design.

## Technical Details

- **Design:** A clear design infrastructure should be implemented using CSS or SCSS.

## Usage

To use this project, clone the repository and open the entry point file in your browser. Customize the design and functionality as needed.

## Author

- **Name:** Pratik Shah
- **LinkedIn:** [Pratik Shah](https://www.linkedin.com/in/patrixshah/)

## License

This project is licensed under the [GNU General Public License](LICENSE).
