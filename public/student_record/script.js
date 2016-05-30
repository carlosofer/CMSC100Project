var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope, $http) {
    $scope.rows = [];

    $http.get("/getStudents")
    .then(function(response) {
        $scope.content = response.data;
        
       for(var i=0; i<response.data.length; i++) {
            $scope.rows.push({
		        'studentNumber': $scope.content[i].studentNumber,
		        'firstName': $scope.content[i].firstName,
		        'middleName': $scope.content[i].middleName,
		        'lastName': $scope.content[i].lastName,
		        'birthDate': $scope.content[i].birthDate,
		        'sex': $scope.content[i].sex,
		        'college': $scope.content[i].college,
		        'degree': $scope.content[i].degree,
		        'major': $scope.content[i].major,
		        'curriculum': $scope.content[i].curriculum
	        });
       }
    }, function(response) {
        $scope.content = "Something went wrong";
    });
    
    $scope.addStudent = function() {
	    var data = { 
            studentNumber: $scope.studentNumber,
            firstName: $scope.firstName,
            middleName: $scope.middleName,
            lastName: $scope.lastName,
            birthDate: $scope.birthDate,
            sex: $scope.sex,
            college: $scope.collegeID,
            degree: $scope.degreeID,
            major: $scope.major,
            curriculum: $scope.curriculumID
        }
        
	    $http.post('/addStudent', data).then(function(response) {
           return Materialize.toast("Successfully created student record!", 1000,"",
            function(){ window.location.href = "/student_record/student_record.html"; });
        }, function(response) {
            $scope.content = "Something went wrong";
        });
    }; 
	
	$scope.searchStudent = function() {        
	    if(($scope.studentNumberSearch == null) && ($scope.lastNameSearch == null) && ($scope.degreeSearch == null) && ($scope.curriculumSearch == null)){
	        return Materialize.toast('Enter in any search field!', 4000);
	    }
	    
        var data = { 
            studentNumber : $scope.studentNumberSearch,
            lastName : $scope.lastNameSearch,
            degree : $scope.degreeSearch,
            curriculum : $scope.curriculumSearch
        }
        
	    $http.post('/searchStudent', data).then(function(response) {
            if(response.data.length == 0) {
                 Materialize.toast('No student record found!', 4000);
            } else {
                $scope.rows = [];
                
                $scope.content = response.data;
            
                for(var i=0; i<response.data.length; i++) {
                     $scope.rows.push({
	                     'studentNumber': $scope.content[i].studentNumber,
	                     'firstName': $scope.content[i].firstName,
	                     'middleName': $scope.content[i].middleName,
	                     'lastName': $scope.content[i].lastName,
	                     'birthDate': $scope.content[i].birthDate,
	                     'sex': $scope.content[i].sex,
	                     'college': $scope.content[i].college,
	                     'degree': $scope.content[i].degree,
	                     'major': $scope.content[i].major,
	                     'curriculum': $scope.content[i].curriculum
                     });
                }
            }

        }, function(response) {
            $scope.content = "Something went wrong";
        });  
    };
    
	$scope.archiveChecker = function(studentNumber) {
        $('#archive_checker').openModal();
        
        $scope.toArchive = studentNumber;
    };
    		
	$scope.archiveStudent = function() {
	    var data = { 
            studentNumber: $scope.toArchive
        }
        
	    $http.post('/archiveStudent', data).then(function(response) {
           return Materialize.toast("Successfully archived student record!", 1000,"",
            function(){ window.location.href = "/student_record/student_record.html"; });
        }, function(response) {
            $scope.content = "Something went wrong";
        });
    }; 
        
    $scope.getDetails = function(rowContent) {
        var rowArray = eval($scope.rows);
        for(var i=0; i<rowArray.length; i++) {
            if( rowArray[i].studentNumber === rowContent.studentNumber ) {
                $scope.firstNameNew = rowArray[i].firstName;
                $scope.middleNameNew = rowArray[i].middleName;
                $scope.lastNameNew = rowArray[i].lastName;
                $scope.birthDateNew = rowArray[i].birthDate;
                $scope.sexNew = rowArray[i].sex;
                $scope.collegeNew = rowArray[i].college;
                $scope.degreeNew = rowArray[i].degree;
                $scope.majorNew = rowArray[i].major;
                $scope.curriculumNew = rowArray[i].curriculum;
                $scope.studentNumberNew = rowArray[i].studentNumber;
                break;
             }
        }
        
        $('#edit_student').openModal();
    };
    
    $scope.updateStudent = function() {               
        var data = { 
            firstName : $scope.firstNameNew,
            middleName : $scope.middleNameNew,
            lastName : $scope.lastNameNew,
            birthDate : $scope.birthDateNew,
            sex : $scope.sexNew,
            college : $scope.collegeNew,
            degree : $scope.degreeNew,
            major : $scope.majorNew,
            curriculum : $scope.curriculumNew,
            studentNumber : $scope.studentNumberNew
        }
        
	    $http.post('/updateStudent/', data).then(function(response) {
           return Materialize.toast("Successfully updated student record!", 1000,"",
            function(){ window.location.href = "/student_record/student_record.html"; });
        }, function(response) {
            $scope.content = "Something went wrong";
        });  
    };
    
    $scope.listValue = 1;
    $scope.listStudents = function() {
        var data = {
            value : $scope.listValue
        }
        
        $http.post('/listStudents', data).then(function(response) {
            $scope.rows = [];
            
            $scope.content = response.data;
        
            for(var i=0; i<response.data.length; i++) {
                 $scope.rows.push({
                     'studentNumber': $scope.content[i].studentNumber,
                     'firstName': $scope.content[i].firstName,
                     'middleName': $scope.content[i].middleName,
                     'lastName': $scope.content[i].lastName,
                     'birthDate': $scope.content[i].birthDate,
                     'sex': $scope.content[i].sex,
                     'college': $scope.content[i].college,
                     'degree': $scope.content[i].degree,
                     'major': $scope.content[i].major,
                     'curriculum': $scope.content[i].curriculum
                 });
            }
        }, function(response) {
            $scope.content = "Something went wrong";
        });    
    };
    
});
