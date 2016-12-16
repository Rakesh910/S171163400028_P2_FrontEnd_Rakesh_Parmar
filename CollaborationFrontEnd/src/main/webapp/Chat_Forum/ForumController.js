'use strict';

app.controller('ForumController',[
	'$scope',
	'ForumService',
	'UserService',
	'$location',
    '$rootScope',
    '$cookieStore',
    '$http',
	function($scope,ForumService,UserService,$location,$rootScope,$cookieStore,$http){
    	console.log("Forum Controller")
    	
    	var self = this;               
    	
    	self.forum = {
    			forumTitle : '',
    			forumContent : ''
    	};
    	
    	self.forumComment = {
    			forumId : '',
    			textComment : ''
    			
    	};
    	   	
    	self.forums = [];  
    	self.forumComments = [];
    	
    	    	
    	self.createForum = function(forum){
    		ForumService.createForum(forum)
    			.then(
    					function(d){
    				self.forum = d;
    			},
    					function(errResponse){
    					console.error('Error While Creating Forum.');
    			});
    	};
    	
    	self.createForumComment = function(forumComment){
    		ForumService.createForumComment(forumComment)
    			.then(
    					function(d){
    				self.forumComment = d;
    				self.fetchAllComments(d.forumId);
    				self.forumComment.textComment = '';
    				self.forumComment.commentId = '';
    			},
    					function(errResponse){
    					console.error('Error While Creating ForumComment.');
    			});
    	};

    	self.fetchAllForums = function(){
    		ForumService.fetchAllForums()
    			.then(function(d){
    					self.forums = d;
    				},function(errResponse){
    					console.error('Error While Fatching Forums.');
    			});
    	};
    	
    	self.fetchAllComments = function(forumId){
    		ForumService.fetchAllComments(forumId)
    			.then(function(d){
    					self.forumComments = d;
    				},function(errResponse){
    					console.error('Error While Fatching Forums.');
    			});
    	};
    	
    	self.fetchAllUsers = function(){
    		console.log("FetchAllUsers");
    		UserService.fetchAllUsers()
    			.then(function(d){
    				self.users = d;
    			},function(errResponse){
    				console.error('Error while fetching Users');
    			});
    	};
    	
    	self.likeForum = likeForum
    		
    	function likeForum(forumId){
    		ForumService.likeForum(forumId)
            	.then(
            			self.fetchAllForums,
            			function(errResponse){
            				console.error('Error while liking forum');
            			}
            	);
    	};
    	
    	self.dislikeForum = dislikeForum
    		
    	function dislikeForum(forumId){
    		ForumService.dislikeForum(forumId)
            	.then(
            			self.fetchAllForums,
            			function(errResponse){
            				console.error('Error while liking forum');
            			}
            	);
    	};
    	
    	
    	self.getSelectedForum = getSelectedForum
    	
    	function getSelectedForum(forumId){
    		console.log("->->Getting Forum with ID :-"+forumId+"AND Status :-"+status);
    		ForumService.getSelectedForum(forumId)
    			.then(
    					function(d){
    						$rootScope.selectedForum = d;
        					$http.defaults.headers.common['Authorization'] = 'Basic' + $rootScope.selectedForum;
        					$cookieStore.put('selectedForum',$rootScope.selectedForum);
    						console.log("Forum found with Id :-"+forumId+"Navigate to ViewForum Page."+self.forum.forumTitle)
    						$location.path('/viewForumById');
    					},
    					function(errResponse){
    						console.error('Error While fetching Forums.');
    					});
    	};
    	
    	self.fetchAllForums();
    	self.fetchAllUsers();
    	self.fetchAllComments($rootScope.selectedForum.forumId);
    	
    	self.submit = function(){
    		{
    			console.log('Saving New Forum',self.forum);
    			self.forum.userID = $rootScope.currentUser.userId;
    			self.createForum(self.forum);           			
    		}
    		self.reset();
    	}
    	
    	self.submitComment = function(forumId){
    		{
    			console.log('Saving New ForumComment In ForumId :'+forumId);
    			self.forumComment.forumId = forumId;
    			self.createForumComment(self.forumComment);           			
    		}
    	}
    	
    	self.reset = function(){
    		self.forum  = {
    				forumId : '',
    				forumTitle : '',
    				forumContent : '',
    				forumDate : '',
    				forumStatus : '',
    				userId : '',
        			errorCode : '',
        			errorMessage : ''
    		};
    		$scope.form.$setPristine();
    	}
}]);