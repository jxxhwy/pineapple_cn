registerController('CollectorController', ['$api', '$scope', '$timeout', function($api, $scope, $timeout) {
  $scope.interfaces = [];
  $scope.monitors = [];

  $scope.selectedInterface = "--";
  $scope.selectedMonitor = "--";

  $scope.startMonLabel = "default";
  $scope.startMon = "Start Monitor";
  $scope.startingMon = false;

  $scope.stopMonLabel = "default";
  $scope.stopMon = "Stop Monitor";
  $scope.stoppingMon = false;

  $scope.scanning = false;

  var mytimeout = null;
  var counter = 0;

  $scope.startMonitor = (function() {
    $scope.startMonLabel = "warning";
    $scope.startMon = "Starting...";
    $scope.startingMon = true;

    $api.request({
      module: 'Collector',
      action: 'startMonitor',
      interface: $scope.selectedInterface
    }, function(response) {
      $scope.startMonLabel = "success";
      $scope.startMon = "Done";

      $timeout(function(){
        $scope.getInterfaces();
        $scope.getMonitors();

        $scope.startMonLabel = "default";
        $scope.startMon = "Start Monitor";
        $scope.startingMon = false;
      }, 2000);
    });
  });

  $scope.stopMonitor = (function() {
    $scope.stopMonLabel = "warning";
    $scope.stopMon = "Stopping...";
    $scope.stoppingMon = true;

    $api.request({
      module: 'Collector',
      action: 'stopMonitor',
      monitor: $scope.selectedMonitor
    }, function(response) {
      $scope.stopMonLabel = "success";
      $scope.stopMon = "Done";

      $timeout(function(){
        $scope.getInterfaces();
        $scope.getMonitors();

        $scope.stopMonLabel = "default";
        $scope.stopMon = "Stop Monitor";
        $scope.stoppingMon = false;
      }, 2000);
    });
  });

  $scope.startScan = (function() {
    $scope.scanning = true;

    $api.request({
      module: 'Collector',
      action: 'startScan'
    });
  });

  $scope.stopScan = (function() {
    $scope.scanning = false;

    $api.request({
      module: 'Collector',
      action: 'stopScan'
    });
  });

  $scope.getInterfaces = (function() {
    $api.request({
      module: 'Collector',
      action: 'getInterfaces'
    }, function(response) {
      $scope.interfaces = response.interfaces;
      $scope.selectedInterface = $scope.interfaces[0];
    });
  });

  $scope.getMonitors = (function() {
    $api.request({
      module: 'Collector',
      action: 'getMonitors'
    }, function(response) {
      $scope.monitors = response.monitors;
      $scope.selectedMonitor = $scope.monitors[0];
    });
  });

  $scope.checkScanning = (function() {
    $api.request({
      module: 'Collector',
      action: 'checkScanning'
    }, function(response) {
      $scope.scanning = response.scanning;
    });
  });

  $scope.checkScanning();
  $scope.getInterfaces();
  $scope.getMonitors();
}]);
