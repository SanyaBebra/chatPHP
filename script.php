<?php 

header('Content-Type: application/json');

$fileName = 'users.txt';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);

  $user = $data['ns'];

  if (file_put_contents('users.txt', $user . "\n", FILE_APPEND)) {
    echo json_encode(['validate' => 'успех']);
  } else {
    echo json_encode(['validate' => 'ошибка отправки']);
  }
  exit;
}


if (file_exists($fileName)) {
  $users = file($fileName, FILE_SKIP_EMPTY_LINES);

  echo json_encode($users);
}