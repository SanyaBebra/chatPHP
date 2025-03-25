<?php 

header('Content-Type: application/json');

$fileName = 'history.txt';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data     = json_decode(file_get_contents('php://input'), true);

  $username = htmlspecialchars($data['username']);
  $message  = htmlspecialchars($data['message']);
  
  if (!empty($username) && !empty($message)) {
    $message = $data['username'] . ': ' . $data['message'] . "\n";
    file_put_contents($fileName, $message, FILE_APPEND);
  }

  echo json_encode($data);
  exit;
}

if (file_exists($fileName)) {
  $history = file($fileName, FILE_SKIP_EMPTY_LINES);
  echo json_encode($history);
  exit;
}

exit;