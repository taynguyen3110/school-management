import { Component, Input, OnInit } from '@angular/core';
import { MultiSelectorComponent } from '../../shared/components/multiselector/multiselector.component';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Params } from '@angular/router';
import { QueryService } from '../../shared/services/filter.service';
import { StudentService } from '../service/student.service';
import { NavigationService } from '../../shared/services/navigation.service';
import { CommonModule } from '@angular/common';
import { Class, Parent } from '../../shared/types';
import { ParentsService } from '../../parents/services/parents.service';
import { ClassesService } from '../../classes/services/classes.service';

@Component({
    standalone: true,
    imports: [MultiSelectorComponent, CommonModule, ReactiveFormsModule],
    selector: 'sman-students-filter',
    templateUrl: 'students-filter.component.html'
})

export class StudentsFilterComponent implements OnInit {
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

    filterStudentForm = this.fb.group({
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
        return this.filterStudentForm.get('name') as FormControl
    }
    get classIds() {
        return this.filterStudentForm.get('classIds') as FormControl
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
        this.filterStudentForm.setValue({ name: this.name.value, classIds: classes.join(',') })
        this.selectedClasses = classes;
    }

    lookUpClassesByName(name: string) {
        this.classesService.lookUpByName(name)
            .subscribe((data) => {
                this.classes = data.classes;
            })
    }

    filterStudents() {
        const newParams = this.queryService.addToCurrentParam({ ...this.filterStudentForm.value, page: 1 });
        this.navigationService.toRoute('students', newParams, true);
    }
}