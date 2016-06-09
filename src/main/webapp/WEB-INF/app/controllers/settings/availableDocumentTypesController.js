vireo.controller("AvailableDocumentTypesController", function ($controller, $scope, AvailableDocumentTypesRepo, DragAndDropListenerFactory) {
	angular.extend(this, $controller("AbstractController", {$scope: $scope}));

	$scope.documentTypes = AvailableDocumentTypesRepo.get();
	
	$scope.ready = AvailableDocumentTypesRepo.ready();

	$scope.dragging = false;
	
	$scope.serverErrors = [];

	$scope.trashCanId = 'available-document-types-trash';
	
	$scope.sortAction = "confirm";

    $scope.degreeLevels = { 'UNDERGRADUATE' : 'Undergraduate',
                            'MASTERS'       : 'Masters'      ,
                            'DOCTORAL'      : 'Doctoral'     };

    $scope.ready.then(function() {

        $scope.resetDocumentTypes = function(){
            $scope.modalData = {
                degreeLevel: 'UNDERGRADUATE'
            };
        };
        
        $scope.closeModal = function(modalId) {
    		angular.element('#' + modalId).modal('hide');
    		// clear all errors, but not infos or warnings
    		if($scope.serverErrors !== undefined) {
    			$scope.serverErrors.errors = undefined;
    		}
    	}

        $scope.resetDocumentTypes();

        $scope.createNewDocumentType = function(documentType) {
            AvailableDocumentTypesRepo.add(documentType).then(function(data) {
            	$scope.serverErrors = angular.fromJson(data.body).payload.ValidationResponse;
            	if($scope.serverErrors === undefined || $scope.serverErrors.errors.length == 0) {
            		$scope.resetDocumentTypes();
            		$scope.closeModal("availableDocumentTypesNewModal");
            	}
            });
	    };	

        $scope.launchEditModal = function(index) {
        	$scope.serverErrors = [];
            $scope.modalData = $scope.documentTypes.list[index -1];
            angular.element('#availableDocumentTypesEditModal').modal('show');
	    };	

        $scope.updateDocumentType = function(){
            AvailableDocumentTypesRepo.update($scope.modalData).then(function(data) {
            	$scope.serverErrors = angular.fromJson(data.body).payload.ValidationResponse;
            	if($scope.serverErrors === undefined || $scope.serverErrors.errors.length == 0) {
            		$scope.resetDocumentTypes();
            		$scope.closeModal("availableDocumentTypesEditModal");
            	}
            });
        }

        $scope.removeDocumentType = function(index){
            AvailableDocumentTypesRepo.remove(index).then(function(data) {
            	$scope.serverErrors = angular.fromJson(data.body).payload.ValidationResponse;
            	if($scope.serverErrors === undefined || $scope.serverErrors.errors.length == 0) {
            		$scope.resetDocumentTypes();
            		$scope.closeModal("availableDocumentTypesConfirmRemoveModal");
            	}
            });
        }

        $scope.reorderDocumentTypes = function(src, dest) {
            AvailableDocumentTypesRepo.reorder(src, dest).then(function(data) {
            	$scope.serverErrors = angular.fromJson(data.body).payload.ValidationResponse;
            	if($scope.serverErrors === undefined || $scope.serverErrors.errors.length == 0) {
            		$scope.resetDocumentTypes();
            	}
            });
        };

        $scope.selectDocumentType = function(index) {
            $scope.modalData = $scope.documentTypes.list[index];
        };

        $scope.sortDocumentTypes = function(column) {
            if($scope.sortAction == 'confirm') {
                $scope.sortAction = 'sort';
            }
            else if($scope.sortAction == 'sort') {
                AvailableDocumentTypesRepo.sort(column).then(function(data) {
                	$scope.serverErrors = angular.fromJson(data.body).payload.ValidationResponse;
                	if($scope.serverErrors === undefined || $scope.serverErrors.errors.length == 0) {
                		$scope.resetDocumentTypes();
                	}
                });
                $scope.sortAction = 'confirm';
            }
        };

        $scope.dragControlListeners = DragAndDropListenerFactory.buildDragControls({
            trashId: $scope.trashCanId,
            dragging: $scope.dragging,
            select: $scope.selectDocumentType,
            model: $scope.documentTypes.list,
            confirm: '#availableDocumentTypesConfirmRemoveModal',
            reorder: $scope.reorderDocumentTypes,
            container: '#available-document-types'
        });

    });

});
