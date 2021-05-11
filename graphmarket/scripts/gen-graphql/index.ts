import 'reflect-metadata';
import fs from 'fs';
import shell from 'shelljs';
import { GraphQLSchema, lexicographicSortSchema } from 'graphql';
import { printSchemaWithDirectives } from '@graphql-tools/utils';
import { echoInfo, echoSuccess } from '@scripts/__utils';
// SERVICES SCHEMA
import { schema as schemaServiceProducts } from '@services/service-products/graphql';
// END SERVICES SCHEMA

const GENERATED_SCHEMA_WARNING: string = `\
# -------------------------------------------
# !!!    THIS FILE WAS AUTO-GENERATED     !!!
# !!! DO NOT MODIFY THIS FILE BY YOURSELF !!!
# -------------------------------------------

`;

const GENERATED_SCHEMA_DIRECTORY: string = '.generated/graphql';

const SCHEMAS: { name: string; schema: GraphQLSchema }[] = [
  { name: 'products', schema: schemaServiceProducts },
];

export async function genGraphql(): Promise<void> {
  // Create schema definitions directory
  shell.mkdir('-p', GENERATED_SCHEMA_DIRECTORY);
  // Remove old schema definition files
  shell.rm('-rf', `${GENERATED_SCHEMA_DIRECTORY}/*`);

  for (const { name, schema } of SCHEMAS) {
    // Schema file path & name
    const schemaFilePath: string = `${GENERATED_SCHEMA_DIRECTORY}/${name}.graphql`;
    // Schema to emit
    const schemaToEmit: string =
      GENERATED_SCHEMA_WARNING + printSchemaWithDirectives(lexicographicSortSchema(schema));

    // Write schema to file
    fs.writeFileSync(schemaFilePath, schemaToEmit);

    echoInfo(`Generated schema definition '${schemaFilePath}' of service '${name}'`);
  }

  echoSuccess(`'gen-graphql' success`);
}

genGraphql();
