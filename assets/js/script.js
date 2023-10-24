$(function () {
  //Function that displays the date and time using dayjs
  function timeOfDay () {
    $('#currentDay').text(dayjs().format('MM/D/YYYY, h:mm:ss A'))
  } 
  //Calls a function that updates the color of the timeblock based on time of day
  updateTimeBlockStyle()
  //Calls a function that displays the saved text in the timeblock
  loadTextAreaValues() 
  //Calls a function that displays the date and time
  timeOfDay()
  //Makes the time of day function run and update every second
  setInterval(timeOfDay, 1000)
  //Makes the style of the timeblocks update every second so that right when the hour changes the timeblock style also changes
  setInterval(updateTimeBlockStyle, 1000)
  //Function when the save button is clicked it will save the input value
  $(".saveBtn").on('click', function() {
    //Variable for the current hour time blocks id 
    var hour = $(this).parent().attr('id')
    //Variable for the text area where theuser input will be 
    var userInput = $(this).siblings('.description').val()
    //Saves a key item pair with the key as the current hour time block and the value as whatever the saved user input is 
    localStorage.setItem(hour, userInput)
  })
  //Function that displays the saved user input from local storage
  function loadTextAreaValues() {
    //Iterates through each time block and runs a fucntion on each one
    $(".time-block").each(function() {
      //Gets the ID of the timeblock and will represent the hour 
      var hour = $(this).attr('id')
      //Gets the saved value from local storage with the hour as the key
      var savedValue = localStorage.getItem(hour)
      //Sets the saved value to the corresponding time block text area
      $(this).find('.description').val(savedValue)
    })
  }
  //Function to update the style of each time block based on the current time
  function updateTimeBlockStyle() {
    //Gets the current hour using dayjs
    var currentHour = dayjs().hour()
    //Gets the time block element
    var timeBlock = $(".time-block")
    //Iterates through each timeblock 
    timeBlock.each(function() {
      //Gets the text content of the first div nested in the time block 
      var calendarHourText = this.children[0].textContent
      //Declares a variable for the calendar hour that we will use later
      var calendarHour
      //Makes it so if the text content includes AM then it removes the suffix so that its just a number
      if (calendarHourText.includes('AM')) {
        calendarHour = parseInt(calendarHourText.replace('AM','').trim())
        //Makes our code reuseable if we wanted to do a full 24 hour calendar
        if (calendarHour === 12) {
          calendarHour = 0
        }
      }
      //Otheriwse if the text content includes PM then we will remove the suffx and add 12 hours unless it is 12
      else {
        calendarHour = parseInt(calendarHourText.replace('PM','').trim())
        //This converts our 12 hour calender to 24 to use and compare with dayjs
        if (calendarHour !== 12) {
          calendarHour += 12
        }
      }
      //Selects the text area element within the timeblock
      var textArea = $(this).find('.description')
      //Makes it so if the hour in our timeblock is less than the current hour from dayjs then the html will update to have the bootstrap class of past
      if (calendarHour < currentHour) {
        textArea.addClass('past')
      }
      //Otherwise if the hour in the timeblock is equal to the current dayjs hour then the html class is updated to present
      else if (calendarHour === currentHour) {
        textArea.addClass('present')
      }
      //If the timeblock hour is greater than the dayjs current hour than the html will get a class of future
      else {
        textArea.addClass('future')
      }
    
    })
  }
})

