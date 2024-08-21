$(document).ready(function () {
  // Constants for the Elevator POC
  const _TOTAL_FLOORS = 10;
  const _ANIMATION_DURATION = 600;
  const _ANIMATION_EASING_TYPE = "swing"; // can be "swing" or "linear"
  const _ELEVATOR_TRANVERSAL_DELAY = 1000; // 1 second delay
  const _ELEVATOR_ARRIVAL_DELAY = 2000; // 2 seconds delay
  const _ELEVATOR_PADDING_AT_FLOOR = 45; // To maintain the padding at the floor for Elevator svg.

  // Get all the elements from DOM with class name "elevator".
  const $elevators = $(".elevator");
  // Get all the elements from DOM with class name "floor".
  const $floors = $(".floor");
  // Get the elevator height.
  const elevatorHeight = $(".elevator").height();
  // Get the floor height.
  const floorHeight = $(".floor").height();
  // Get the audio element for playing the sound on arrival at the floor.
  const arrivalSound = document.getElementById("arrivalSound");

  // Initialize queues for each elevator (Array of Arrays)
  const elevatorQueues = new Array($elevators.length).fill(null).map(() => []);

  // Implemented the Button click event to manage each floor request.
  $floors.find("button").click(function () {
    // Get floor number from where the button is clicked.
    const targetFloor = $(this).closest(".floor").data("floor");
    // Store the button element
    const $button = $(this);
    // Update button text to "Waiting" and add the class to indicate respective color code.
    $button.text("Waiting").addClass("waiting");
    // Identifies the closest elevator to the target floor.
    const nearestElevatorIndex = getNearestElevatorIndex(targetFloor);
    // Add the request to the corresponding elevator's queue variable
    elevatorQueues[nearestElevatorIndex].push({
      floor: targetFloor,
      button: $button,
    });
    // If the elevator is not currently moving, process the queue to handle the next call.
    processQueue(nearestElevatorIndex);
  });

  /**
   * Identifies the closest elevator to the target floor.
   *
   * @param number targetFloor
   * @returns number
   *
   * @author Pratik
   * @since August 2024
   */
  function getNearestElevatorIndex(targetFloor) {
    let nearestElevatorIndex = -1;
    let minDistance = Infinity;
    $elevators.each(function (index) {
      const currentFloor = $(this).data("floor");
      const distance = Math.abs(currentFloor - targetFloor);
      if (distance < minDistance) {
        minDistance = distance;
        nearestElevatorIndex = index;
      }
    });
    return nearestElevatorIndex;
  }

  /**
   * Processes the queue requests for a given elevator index and manages its movement to handle next call to reach at floor.
   *
   * @param number elevatorIndex
   * @returns void
   *
   * @author Pratik
   * @since August 2024
   */
  function processQueue(elevatorIndex) {
    const queue = elevatorQueues[elevatorIndex];
    const $elevator = $($elevators[elevatorIndex]);
    if (queue.length > 0 && !$elevator.data("moving")) {
      const nextRequest = queue.shift();
      const targetFloor = nextRequest.floor;
      const $button = nextRequest.button;
      const targetPosition = (_TOTAL_FLOORS - targetFloor) * floorHeight;
      // Mark elevator as moving
      $elevator
        .data("moving", true)
        .removeClass("call")
        .removeClass("arrived")
        .addClass("waiting");
      // Animate the elevator's movement
      $elevator
        .animate(
          { top: targetPosition - _ELEVATOR_PADDING_AT_FLOOR },
          {
            duration: _ANIMATION_DURATION,
            easing: _ANIMATION_EASING_TYPE,
          }
        )
        .queue(function () {
          $(this).data("floor", targetFloor).data("moving", false);
          // Delay for 1 second then update the button text to "Arrived" to maintain the traversal of Elevator.
          setTimeout(() => {
            // Update button to "Arrived"
            $button.text("Arrived").removeClass("waiting").addClass("arrived");
            $(this).removeClass("waiting").addClass("arrived");
            // Play the arrival sound
            arrivalSound.play();
          }, _ELEVATOR_TRANVERSAL_DELAY);
          // Delay then change to "Call"
          setTimeout(() => {
            // Pause the arrival sound.
            arrivalSound.pause();
            $button.text("Call").removeClass("arrived");
            $(this).removeClass("arrived").addClass("call");
            // Process the next request in the queue
            processQueue(elevatorIndex);
          }, _ELEVATOR_ARRIVAL_DELAY);
          $(this).dequeue();
        });
    }
  }
});
