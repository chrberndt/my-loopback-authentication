import {AuthenticationComponent} from '@loopback/authentication';
import {
  JWTAuthenticationComponent,
  UserServiceBindings
} from '@loopback/authentication-jwt';
// import {DbDataSource} from './datasources';
import {PostgresDataSource} from './datasources';

// in the class constructor, we mount the two components we just imported,
// AuthenticationComponent and JWTAuthenticationComponent
// We also create a new datasource from the MongoDataSource we created in the previous step
// and the UserServiceBindings, which define default options for the new datasource,
// like its name, the repository to use for Users and UserCredentials
// (which are in our case the default LoopBack 4 ones)

import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';

export {ApplicationConfig};

export class MyLoopbackAuthenticationApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

  // ------ ADD SNIPPET AT THE BOTTOM ---------
  // Mount authentication system
  this.component(AuthenticationComponent);
  // Mount jwt component
  this.component(JWTAuthenticationComponent);
  // Bind datasource
  this.dataSource(PostgresDataSource, UserServiceBindings.DATASOURCE_NAME);
  // this.dataSource(DbDataSource, UserServiceBindings.DATASOURCE_NAME);
  // ------------- END OF SNIPPET -------------
  }
}
