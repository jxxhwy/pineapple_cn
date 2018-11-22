<?php namespace pineapple;

class Collector extends Module
{
  public function route()
  {
    switch ($this->request->action) {
      case 'startMonitor':
        $this->startMonitor();
        break;
      case 'stopMonitor':
        $this->stopMonitor();
        break;
      case 'getInterfaces':
        $this->getInterfaces();
        break;
      case 'getMonitors':
        $this->getMonitors();
        break;
      case 'startScan':
        $this->startScan();
        break;
      case 'stopScan':
        $this->stopScan();
        break;
      case 'checkScanning':
        $this->checkScanning();
        break;
    }
  }

  private function startMonitor()
  {
    exec("airmon-ng start ".$this->request->interface);
  }

  private function stopMonitor()
  {
    exec("airmon-ng stop ".$this->request->monitor);
  }

  private function getInterfaces()
  {
    exec("iwconfig 2> /dev/null | grep \"wlan*\" | grep -v \"mon*\" | awk '{print $1}'", $interfaceArray);

    $this->response = array("interfaces" => $interfaceArray);
  }

  private function getMonitors()
  {
    exec("iwconfig 2> /dev/null | grep \"mon*\" | awk '{print $1}'", $monitorArray);

    $this->response = array("monitors" => $monitorArray);
  }

  private function startScan()
  {
    exec("airodump-ng --write /pineapple/modules/Collector/log/collectorLog --output-format kismet wlan1mon");
  }

  private function stopScan()
  {
    exec("killall -9 airodump-ng");
  }

  protected function checkRunning($processName)
  {
    return exec("ps w | grep {$processName} | grep -v grep") !== '' ? 1 : 0;
  }

  private function checkScanning()
  {
    if ($this->checkRunning("airodump-ng")) {
      $scanning = true;
    }
    else {
      $scanning = false;
    }
    $this->response = array("scanning" => $scanning);
  }
}
