<?php
ini_set('display_errors', 0);          // mets 1 en développement pour voir les erreurs
session_start();
header('Content-Type: application/json; charset=utf-8');

$pdo = new PDO('mysql:host=localhost;dbname=vinty;charset=utf8mb4', 'root', '', [
  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
]);

function out($data, $code = 200) { http_response_code($code); echo json_encode($data, JSON_UNESCAPED_UNICODE); exit; }
function me()   { return $_SESSION['uid'] ?? null; }
function need() { if (!me()) out(['error' => 'auth'], 401); return (int)me(); }
function body() { return json_decode(file_get_contents('php://input'), true) ?? $_POST; }
