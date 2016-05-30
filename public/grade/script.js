var app = angular.module("myApp", []);
		    
app.controller("myCtrl", function($scope, $http) {
    $scope.rows = [];

    $scope.createGrade = function() {
       var data = { 
            studentNumber: $scope.studentNumber,
            course: $scope.course,
            section: $scope.section,
            year: $scope.year,
            semester: $scope.semester,
            units: $scope.units,
            grade: $scope.grade,
            remarks: $scope.remarks
        }
        
        $http.post('/createGrade', data).then(function(response) {
           return Materialize.toast("Successfully created grade!", 1000,"",
            function(){ window.location.href = "/grade/grade.html"; });
        }, function(response) {
            $scope.content = "Something went wrong";
        });
    };  
                
    $scope.retrieveGrade = function() {        
        if(($scope.studentNumberS == null) && ($scope.courseS == null) && ($scope.sectionS == null) && ($scope.yearS == null) && ($scope.semesterS == null)){
            return Materialize.toast('Enter in any retrieve field!', 4000);
        }
        
        var data = { 
            studentNumber : $scope.studentNumberS,
            course : $scope.courseS,
            section : $scope.sectionS,
            year : $scope.yearS,
            semester : $scope.semesterS
        }
        
        $http.post('/retrieveGrade', data).then(function(response) {
            if(response.data.length == 0) {
                 Materialize.toast('No grade found!', 4000);
            } else {
                $scope.rows = [];
                
                $scope.content = response.data;
            
                for(var i=0; i<response.data.length; i++) {
                     $scope.rows.push({
                        'studentNumber': $scope.content[i].studentNumber,
                        'course': $scope.content[i].course,
                        'section': $scope.content[i].section,
                        'year': $scope.content[i].year,
                        'semester': $scope.content[i].semester,
                        'units': $scope.content[i].units,
                        'grade': $scope.content[i].grade,
                        'remarks': $scope.content[i].remarks,
                        'id': $scope.content[i].id
                     });
                }
            }
        }, function(response) {
            Materialize.toast('No grade found!', 4000);
            $scope.rows = [];
            $scope.content = "Something went wrong";
        });
    };
    
    $scope.getDetails = function(rowContent) {
        var rowArray = eval($scope.rows);
        for(var i=0; i<rowArray.length; i++) {
            if( rowArray[i].id === rowContent.id ) {
                $scope.studentNumberNew = rowArray[i].studentNumber;
                $scope.courseNew = rowArray[i].course;
                $scope.sectionNew = rowArray[i].section;
                $scope.yearNew = rowArray[i].year;
                $scope.semesterNew = rowArray[i].semester;
                $scope.unitsNew = rowArray[i].units;
                $scope.gradeNew = rowArray[i].grade;
                $scope.remarksNew = rowArray[i].remarks;
                $scope.idNew = rowArray[i].id;
                break;
             }
        }
        
        $('#edit_grade').openModal();
    };
    
    $scope.updateGrade = function() {               
        var data = { 
            studentNumber : $scope.studentNumberNew,
            course : $scope.courseNew,
            section : $scope.sectionNew,
            year : $scope.yearNew,
            semester : $scope.semesterNew,
            units : $scope.unitsNew,
            grade : $scope.gradeNew,
            remarks : $scope.remarksNew,
            id : $scope.idNew 
        }
        
	    $http.post('/updateGrade/', data).then(function(response) {
           Materialize.toast('Successfully updated grade!', 1000);
           
           var data = { 
                studentNumber : $scope.studentNumberS,
                course : $scope.courseS,
                section : $scope.sectionS,
                year : $scope.yearS,
                semester : $scope.semesterS
            }
            
            $http.post('/retrieveGrade', data).then(function(response) {
                if(response.data.length == 0) {
                     Materialize.toast('No grade found!', 4000);
                } else {
                    $scope.rows = [];
                    
                    $scope.content = response.data;
                
                    for(var i=0; i<response.data.length; i++) {
                         $scope.rows.push({
                            'studentNumber': $scope.content[i].studentNumber,
                            'course': $scope.content[i].course,
                            'section': $scope.content[i].section,
                            'year': $scope.content[i].year,
                            'semester': $scope.content[i].semester,
                            'units': $scope.content[i].units,
                            'grade': $scope.content[i].grade,
                            'remarks': $scope.content[i].remarks,
                            'id': $scope.content[i].id
                         });
                    }
                }
            }, function(response) {
                Materialize.toast('No grade found!', 4000);
                $scope.rows = [];
                $scope.content = "Something went wrong";
            });
        }, function(response) {
            $scope.content = "Something went wrong";
        });  
    };
    
    $scope.removeChecker = function(id) {
        $('#remove_checker').openModal();
        
        $scope.toRemove = id;
    };
    		
	$scope.removeGrade = function() {
	    var data = { 
            id: $scope.toRemove
        }
        
	    $http.post('/removeGrade', data).then(function(response) {
           Materialize.toast('Successfully removed grade!', 1000);
           
           var data = { 
                studentNumber : $scope.studentNumberS,
                course : $scope.courseS,
                section : $scope.sectionS,
                year : $scope.yearS,
                semester : $scope.semesterS
            }
            
            $http.post('/retrieveGrade', data).then(function(response) {
                if(response.data.length == 0) {
                     Materialize.toast('No grade found!', 4000);
                } else {
                    $scope.rows = [];
                    
                    $scope.content = response.data;
                
                    for(var i=0; i<response.data.length; i++) {
                         $scope.rows.push({
                            'studentNumber': $scope.content[i].studentNumber,
                            'course': $scope.content[i].course,
                            'section': $scope.content[i].section,
                            'year': $scope.content[i].year,
                            'semester': $scope.content[i].semester,
                            'units': $scope.content[i].units,
                            'grade': $scope.content[i].grade,
                            'remarks': $scope.content[i].remarks,
                            'id': $scope.content[i].id
                         });
                    }
                }
            }, function(response) {
                Materialize.toast('No grade found!', 4000);
                $scope.rows = [];
                $scope.content = "Something went wrong";
            });
        }, function(response) {
            $scope.content = "Something went wrong";
        });
    }; 
});
