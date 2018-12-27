/* STUDENT APPLICATION */
$(function() {

  var model = {

    attendance: null,

    numberDays: 13,

    students: [{
        name: "Slappy the Frog",
        absent: [],
        total: 0
      },
      {
        name: "Lilly the Lizard",
        absent: [],
        total: 0
      },
      {
        name: "Paulrus the Walrus",
        absent: [],
        total: 0
      },
      {
        name: "Gregory the Goat",
        absent: [],
        total: 0
      },
      {
        name: "Adam the Anaconda",
        absent: [],
        total: 0
      },
      {
        name: "Test",
        absent: [],
        total: 0
      }
    ],


    createLocalStorage: function() {

      console.log('Creating attendance records...');

      function getRandom() {
        return (Math.random() >= 0.5);
      }

      var nameColumns = $('tbody .name-col'),
        days = this.numberDays,
        attendance = {};

      nameColumns.each(function() {
        var name = this.innerText;
        attendance[name] = [];

        for (var i = 0; i <= (days-1); i++) {
          attendance[name].push(getRandom());
        }
      });

      localStorage.attendance = JSON.stringify(attendance);

    },

    setDataFromLocalStorage: function() {

      console.log('setDataFromLocalStorage');
      model.attendance = JSON.parse(localStorage.attendance);

    }

  };

  var octopus = {

    init: function() {
      if (!localStorage.attendance) {
        model.createLocalStorage();
        this.getPageFromData();
      } else {
        this.getPageFromLocalStorage();
      }
    },

    getPageFromLocalStorage: function() {

      console.log('getPageFromLocalStorage');
      //don't need this
      model.setDataFromLocalStorage();
      //set data from local storage
      reportCardView.init(model.numberDays, model.students);
      this.generateAttendance();
      //reportCardView.render();

    },

    getPageFromData: function() {
      console.log('getPageFromData');
      reportCardView.init(model.numberDays, model.students);

    },

    getStudents: function() {
      return model.students;
    },

    getWeeks: function() {
      return model.numberDays;
    },

    updateAttendance: function() {
      // return model.numberDays;
      console.log('update attendance');
      reportCardView.render();
      this.updateDaysMissed();
    },

    generateAttendance: function() {
      // return model.numberDays;
      console.log('generate attendance');
      $.each(model.attendance, function(name, days) {
        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
          dayChecks = $(studentRow).children('.attend-col').children('input');

        dayChecks.each(function(i) {
          $(this).prop('checked', days[i]);
        });
      });
      this.updateDaysMissed();
    },

    updateDaysMissed: function() {
      // return model.numberDays;
      console.log('update days missed');
      $allMissed = $('tbody .missed-col');
      $allMissed.each(function() {
        var studentRow = $(this).parent('tr'),
          dayChecks = $(studentRow).children('td').children('input'),
          numMissed = 0;

        dayChecks.each(function() {
          if (!$(this).prop('checked')) {
            numMissed++;
          }
        });

        $(this).text(numMissed);
      });
      //reportCardView.render();
    }

  };

  var reportCardView = {

    init: function(days, students) {
      //toDo: pass in student names and days
      console.log('render reportCardView');
      $header = $('thead .header');
      $student = $('tbody');

      //add columns
      var htmlHeaderStr = '<th class="name-col">Student Name</th>';

      for (var i = 0; i < days; i++) {
        htmlHeaderStr += '<th>' + (i + 1) + '</th>';
      }

      $header.html(htmlHeaderStr + '<th class="missed-col">Days Missed-col</th>');

      //add students
      var htmlStudentStr = '';

      students.forEach(function(student) {

        htmlStudentStr += '<tr class="student"><td class="name-col">' + student.name + '</td>';

        for (var w = 0; w < days; w++) {
          htmlStudentStr += '<td class="attend-col"><input type="checkbox"></td>';
        }

        htmlStudentStr += '<td class="missed-col">0</td></tr>';

      });

      $student.html(htmlStudentStr);

      $allCheckboxes = $('tbody input');
      $allCheckboxes.on('click', function() {
        octopus.updateAttendance();
      });

    },

    render: function() {
      //toDo: this should not be here, should be in octopus
      var studentRows = $('tbody .student');
      var newAttendance = {};
      var allCheckboxes = $('tbody input');
      studentRows.each(function() {
        var name = $(this).children('.name-col').text(),
          allCheckboxes = $(this).children('td').children('input');

        newAttendance[name] = [];

        allCheckboxes.each(function() {
          newAttendance[name].push($(this).prop('checked'));
        });
      });
      localStorage.attendance = JSON.stringify(newAttendance);
    }

  };

  octopus.init();

}());
