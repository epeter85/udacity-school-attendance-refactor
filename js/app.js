/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());


/* STUDENT APPLICATION */
$(function() {

    var model = {

      attendance: JSON.parse(localStorage.attendance),

      numberDays: 12,

      students: [
        {
          name: "Slappy the Frog",
          absent: []
        },
        {
          name: "Lilly the Lizard",
          absent: []
        },
        {
          name: "Paulrus the Walrus",
          absent: []
        },
        {
          name: "Gregory the Goat",
          absent: []
        },
        {
          name: "Adam the Anaconda",
          absent: []
        }
      ]

    };

    var octopus = {

      init: function() {
        reportCardView.init();
        reportCardView.render();
      },

      getStudents: function() {
        return model.students;
      },

      getWeeks: function() {
        return model.numberDays;
      }

    };

    var reportCardView = {

      init: function() {

        $header = $('thead .header');
        $student = $('tbody');

        //add columns
        var weeks = octopus.getWeeks();
        var htmlHeaderStr = '<th class="name-col">Student Name</th>';

        for (var i = 0; i < weeks; i++) {
          htmlHeaderStr +=  '<th>' + (i+1) + '</th>';
        }

        $header.html( htmlHeaderStr + '<th class="missed-col">Days Missed-col</th>' );

        //add students
        var htmlStudentStr = '';

        octopus.getStudents().forEach(function(student){

          htmlStudentStr += '<tr class="student"><td class="name-col">' + student.name + '</td>';

          for (let i = 0; i < weeks; i++) {
            htmlStudentStr +=  '<td class="attend-col"><input type="checkbox"></td>';
          }

          htmlStudentStr += '<td class="missed-col">0</td></tr>';

        });

        $student.html( htmlStudentStr );

      },

      render: function() {

      }

    };

    octopus.init();

    // var attendance = JSON.parse(localStorage.attendance),
    //     $allMissed = $('tbody .missed-col'),
    //     $allCheckboxes = $('tbody input');
    //
    // // Count a student's missed days
    // function countMissing() {
    //     $allMissed.each(function() {
    //         var studentRow = $(this).parent('tr'),
    //             dayChecks = $(studentRow).children('td').children('input'),
    //             numMissed = 0;
    //
    //         dayChecks.each(function() {
    //             if (!$(this).prop('checked')) {
    //                 numMissed++;
    //             }
    //         });
    //
    //         $(this).text(numMissed);
    //     });
    // }
    //
    // // Check boxes, based on attendace records
    // $.each(attendance, function(name, days) {
    //     var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
    //         dayChecks = $(studentRow).children('.attend-col').children('input');
    //
    //     dayChecks.each(function(i) {
    //         $(this).prop('checked', days[i]);
    //     });
    // });
    //
    // // When a checkbox is clicked, update localStorage
    // $allCheckboxes.on('click', function() {
    //     var studentRows = $('tbody .student'),
    //         newAttendance = {};
    //
    //     studentRows.each(function() {
    //         var name = $(this).children('.name-col').text(),
    //             $allCheckboxes = $(this).children('td').children('input');
    //
    //         newAttendance[name] = [];
    //
    //         $allCheckboxes.each(function() {
    //             newAttendance[name].push($(this).prop('checked'));
    //         });
    //     });
    //
    //     countMissing();
    //     localStorage.attendance = JSON.stringify(newAttendance);
    // });
    //
    // countMissing();
}());
