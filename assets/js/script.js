// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  $('#currentDay').text(dayjs().format('MM/D/YYYY, h:mm A'))
  var saveBtn = $(".saveBtn")
  saveBtn.on('click', function() {
    var hour = $(this).parent().attr('id')
    var userInput = $(this).siblings('.description').val()
    console.log(this)
    console.log("saved")
    console.log(hour)
    localStorage.setItem(hour, userInput)
    var savedUserInput = localStorage.getItem(hour)
    console.log("this is what should save: " + savedUserInput)
    var timeBlock = $(".time-block")
    timeBlock.each(function() {
      var calendarHourText = this.children[0].textContent
      var calendarHour
      console.log(calendarHourText)
      if (calendarHourText.includes('AM')) {
        calendarHour = parseInt(calendarHourText.replace('AM','').trim())
      }
      else {
        calendarHour = parseInt(calendarHourText.replace('PM','').trim())
        if (calendarHour !== 12) {
          calendarHour += 12
        }
      }
      console.log(calendarHour)
      var currentHour = dayjs().hour()
      var textArea = $('.description')
      console.log(currentHour)
      if (calendarHour < currentHour) {
        console.log('past hour')
       console.log(textArea)
       textArea.addClass('past')
      }
      else if (calendarHour === currentHour) {
        console.log('present hour')
        textArea.addClass('present')
      }
      else {
        console.log('future hour')
        textArea.addClass('future')
      }
    })
  })
})

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
