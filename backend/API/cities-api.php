
<?php

header("Content-Type: application/json; charset=UTF-8");

// Adresse de l'API
$url = "https://countriesnow.space/api/v0.1/countries";

// Récupérer les données
$response = file_get_contents($url);

// Vérifier la connexion
if ($response === false) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur API"]);
    exit;
}

// Transformer JSON en tableau PHP
$result = json_decode($response, true);

// Chercher le Maroc
$cities = [];

foreach ($result["data"] as $country) {
    if ($country["country"] === "Morocco") {
        $cities = $country["cities"];
        break;
    }
}

// Vérifier les villes
if (empty($cities)) {
    http_response_code(500);
    echo json_encode(["error" => "Villes introuvables"]);
    exit;
}

// Trier les villes
sort($cities);

// Enregistrer dans cities.json
$file = __DIR__ . "/../data/cities.json";

file_put_contents(
    $file,
    json_encode($cities, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
);

// Envoyer les villes au navigateur
echo json_encode($cities, JSON_UNESCAPED_UNICODE);

?>
