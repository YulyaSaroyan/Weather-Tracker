import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1746095610937 implements MigrationInterface {
    name = 'Init1746095610937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cities" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, CONSTRAINT "UQ_a0ae8d83b7d32359578c486e7f6" UNIQUE ("name"), CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "weather-trackings" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "fetchedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "temperature" double precision NOT NULL, "windspeed" double precision NOT NULL, "cityId" integer, CONSTRAINT "PK_bfe53df08c7296b4c7e3b08240d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "weather-trackings" ADD CONSTRAINT "FK_b053dd21739759503fd64797262" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "weather-trackings" DROP CONSTRAINT "FK_b053dd21739759503fd64797262"`);
        await queryRunner.query(`DROP TABLE "weather-trackings"`);
        await queryRunner.query(`DROP TABLE "cities"`);
    }

}
