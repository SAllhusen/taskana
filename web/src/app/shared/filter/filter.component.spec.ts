import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';

import {FilterModel} from 'app/models/filter';
import {IconTypeComponent} from '../../administration/components/type-icon/icon-type.component';
import {FilterComponent} from './filter.component';
import {MapValuesPipe} from 'app/shared/pipes/mapValues/map-values.pipe';
import {configureTests} from 'app/app.test.configuration';

describe('FilterComponent', () => {
  let component: FilterComponent,
    fixture: ComponentFixture<FilterComponent>,
    debugElement: any;


  beforeEach(done => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        declarations: [FilterComponent, IconTypeComponent, MapValuesPipe],
        imports: [AngularSvgIconModule, FormsModule, HttpClientModule, HttpModule]
      })
    };
    configureTests(configure).then(testBed => {
      fixture = TestBed.createComponent(FilterComponent);
      component = fixture.componentInstance;
      component.filter = new FilterModel({
        name: 'someName', owner: 'someOwner', description: 'someDescription',
        key: 'someKey', type: 'PERSONAL'
      });
      debugElement = fixture.debugElement.nativeElement;
      fixture.detectChanges();
      done();
    });
  });

  afterEach((done) => {
    document.body.removeChild(debugElement);
  });

  it('should create', (done) => {
    expect(component).toBeTruthy();
  });

  it('should create a component', (done) => {
    expect(debugElement.querySelector('#some-id')).toBeNull();
    fixture.detectChanges();
    expect(debugElement.querySelector('#some-id')).toBeDefined();
  });

  it('should have filter by: name, description, key, owner and type  defined', (done) => {
    expect(debugElement.querySelector('#display-name-filter')).toBeDefined();
    expect(debugElement.querySelector('#display-description-filter')).toBeDefined();
    expect(debugElement.querySelector('#display-key-filter')).toBeDefined();
    expect(debugElement.querySelector('#display-owner-filter')).toBeDefined();
    expect(debugElement.querySelector('#display-type-filter')).toBeDefined();
  });

  it('should be able to clear all fields after pressing clear button', (done) => {
    component.filter = new FilterModel({
      name: 'someName', owner: 'someOwner', description: 'someDescription',
      key: 'someKey', type: 'PERSONAL'
    });
    debugElement.querySelector('[title="Clear"]').click();
    expect(component.filter.filterParams.name).toBe('');
    expect(component.filter.filterParams.description).toBe('');
    expect(component.filter.filterParams.owner).toBe('');
    expect(component.filter.filterParams.type).toBe('');
    expect(component.filter.filterParams.key).toBe('');
  });

  it('should be able to select a type and return it based on a number', (done) => {
    expect(component).toBeTruthy();
  });

  it('should be able to emit a filter after clicking on search button', (done) => {
    component.filter = new FilterModel({
      name: 'someName', owner: 'someOwner', description: 'someDescription',
      key: 'someKey', type: 'PERSONAL'
    });
    component.performFilter.subscribe(filter => {
      expect(filter.name).toBe('someName');
      done();
    });
    debugElement.querySelector('[title="Search"]').click();
  });

});