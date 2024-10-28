import { Component, Input, OnInit } from '@angular/core';
import { MultiSelectorComponent } from '../../shared/components/multiselector/multiselector.component';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Params } from '@angular/router';
import { QueryService } from '../../shared/services/filter.service';
import { NavigationService } from '../../shared/services/navigation.service';
import { CommonModule } from '@angular/common';
import { Class, Parent } from '../../shared/types';
import { ParentsService } from '../services/parents.service';
import { ClassesService } from '../../classes/services/classes.service';
import { StudentService } from '../../students/service/student.service';

@Component({
    standalone: true,
    imports: [MultiSelectorComponent, CommonModule, ReactiveFormsModule],
    selector: 'sman-parent-filter',
    templateUrl: 'parent-filter.component.html'
})

export class ParentFilterComponent implements OnInit {
    @Input() queryParams: Params = {}

    classes: Class[] = [];
    selectedClasses: string[] = [];

    constructor(
        private navigationService: NavigationService,
        private studentService: StudentService,
        private classService: ClassesService,
        private classesService: ClassesService,
        private queryService: QueryService,
        private fb: FormBuilder,
    ) { }

    filterParentForm = this.fb.group({
        name: ['', [
        ]],
        classIds: ['', [
        ]],
    })

    ngOnChanges() {
        this.getQueryParams()
    }

    ngOnInit() {
        this.classService.getClasses().subscribe((data: any) => {
            this.classes = data.classes
        })
    }

    get name() {
        return this.filterParentForm.get('name') as FormControl
    }
    get classIds() {
        return this.filterParentForm.get('classIds') as FormControl
    }

    getQueryParams() {
        this.queryParams['name'] ? this.name.setValue(this.queryParams['name']) : this.name.setValue('');
        this.selectedClasses = this.queryParams['classIds'] ? this.queryParams['classIds'].split(',') : [];
    }

    classList() {
        return this.classes.map((c) => {
            return { id: c.id, label: c.name }
        })
    }

    handleSelect(eventData: string[] | string) {
        if (Array.isArray(eventData)) {
            this.updateClassFilter(eventData)
        }
    }

    updateClassFilter(classes: string[]) {
        this.filterParentForm.setValue({ name: this.name.value, classIds: classes.join(',') })
        this.selectedClasses = classes;
    }

    lookUpClassesByName(name: string) {
        this.classesService.lookUpByName(name)
            .subscribe((data) => {
                this.classes = data.classes;
            })
    }

    filterParents() {
        const newParams = this.queryService.addToCurrentParam({ ...this.filterParentForm.value, page: 1 });
        this.navigationService.toRoute('parents', newParams, true);
    }
}