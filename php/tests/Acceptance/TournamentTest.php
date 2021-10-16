<?php

namespace App\Tests\Acceptance;

use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;

class TournamentTest extends ApiTestCase
{
    public function testTournamentCreation(): void
    {
        $client = static::createClient();
        $client->request('POST', '/api/tournament', [
            'headers' => [
                'Content-Type: application/json',
                'Accept: application/json',
            ],
            'body' => json_encode(['name' => 'Tournament'])
        ]);

        $this->assertResponseIsSuccessful();
        $response = $client->getResponse()->toArray();

        $this->assertIsString($response["id"]);
    }

    public function testTournamentCreationShouldEnableToRetrieveAfter(): void
    {
        $client = static::createClient();
        $client->request('POST', '/api/tournament', [
            'headers' => [
                'Content-Type: application/json',
                'Accept: application/json',
            ],
            'body' => json_encode(['name' => 'Tournament'])
        ]);

        $this->assertResponseIsSuccessful();
        $response = $client->getResponse()->toArray();

        $this->assertIsString($response["id"]);

        $client->request('GET', '/api/tournament/' . $response["id"]);
        $this->assertResponseIsSuccessful();
        $response = $client->getResponse()->toArray();
        $this->assertEquals("Tournament", $response["name"]);
    }

    public function testShouldReturnEmptyIfTournamentDoesNotExist(): void
    {
        static::createClient()->request('GET', '/api/tournament/123');

        $this->assertResponseStatusCodeSame(404);
    }
}
