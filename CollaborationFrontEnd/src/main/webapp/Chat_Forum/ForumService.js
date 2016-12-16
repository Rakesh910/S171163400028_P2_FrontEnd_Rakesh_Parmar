'use strict';

app.factory('ForumService',[
           '$http',
           '$q',
           '$rootScope',
           function($http,$q,$rootScope){
        	   console.log("Forum Service...");
        	   
        	   var BASE_URL = 'http://localhost:8080/CollabrationBackEnd'
        	   return{

        		   createForum: function(forum){
        			   return $http.post(BASE_URL+'/ForumPages/CreateForum/',forum)
        			   		.then(
        			   				function(response){
        			   					return response.data;
        			   				},
        			   				function(errResponse){
        			   					console.error('Error While Creating User');
        			   					return $q.reject(errResponse);
        			   				}
        			   		);
        		   },
        		   
        		   createForumComment: function(forum){
        			   return $http.post(BASE_URL+'/ForumPages/SaveForumComment/',forum)
        			   		.then(
        			   				function(response){
        			   					return response.data;
        			   				},
        			   				function(errResponse){
        			   					console.error('Error While Creating User');
        			   					return $q.reject(errResponse);
        			   				}
        			   		);
        		   },
        		   
        		   fetchAllForums: function(){
        			   return $http.get(BASE_URL+'/ForumPages/ForumList/')
        			   		.then(
        			   				function(response){
        			   					return response.data;
        			   				},
        			   				function(errResponse){
        			   					console.error('Error While Fatching BlogList.');
        			   					return $q.reject(errResponse);
        			   				}
        			   		);
        			   
        		   },
        		   
        		   fetchAllComments: function(forumId){
        			   return $http.get(BASE_URL+'/ForumPages/CommentList/'+forumId)
        			   		.then(
        			   				function(response){
        			   					return response.data;
        			   				},
        			   				function(errResponse){
        			   					console.error('Error While Fatching fetchAllComments.');
        			   					return $q.reject(errResponse);
        			   				}
        			   		);
        			   
        		   },
        		   
        		   likeForum: function(forumId){
        			   return $http.put(BASE_URL+'/ForumPages/Like/'+forumId)
        			   		.then(
        			   				function(response){
        			   					return response.data;
        			   				},
        			   				function(errResponse){
        			   					console.error('Error While Fatching BlogList.');
        			   					return $q.reject(errResponse);
        			   				}
        			   		);
        			   
        		   },
        		   
        		   dislikeForum: function(forumId){
        			   return $http.put(BASE_URL+'/ForumPages/DisLike/'+forumId)
        			   		.then(
        			   				function(response){
        			   					return response.data;
        			   				},
        			   				function(errResponse){
        			   					console.error('Error While Fatching BlogList.');
        			   					return $q.reject(errResponse);
        			   				}
        			   		);
        			   
        		   },
        		   
        		   getSelectedForum: function(forumId){
        			   return $http.get(BASE_URL+'/ForumPages/GetForumById/'+forumId)
        			   		.then(
        			   				function(response){
        			   					return response.data;
        			   				},
        			   				function(errResponse){
        			   					console.error('Error While Getting Blog By Id :-'+forumId);
        			   					return $q.reject(errResponse);
        			   				}
        			   		);
        		   },
        	   }
}]);