import { Component, Input, OnInit } from '@angular/core';
import { MultiSelectorComponent } from '../../shared/components/multiselector/multiselector.component';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Params } from '@angular/router';
import { QueryService } from '../../shared/services/filter.service';
import { NavigationService } from '../../shared/services/navigation.service';
import { CommonModule } from '@angular/common';
import { Class, Parent } from '../../shared/types';
import { ClassesService } from '../../classes/services/classes.service';
import { StudentService } from '../../students/service/student.service';

@Component({
    standalone: true,
    imports: [MultiSelectorComponent, CommonModule, ReactiveFormsModule],
    selector: 'sman-teacher-filter',
    templateUrl: 'teacher-filter.component.html'
})

export class TeacherFilterComponent implements OnInit {
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

    filterTeacherForm = this.fb.group({
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
        return this.filterTeacherForm.get('name') as FormControl
    }
    get classIds() {
        return this.filterTeacherForm.get('classIds') as FormControl
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
        this.filterTeacherForm.setValue({ name: this.name.value, classIds: classes.join(',') })
        this.selectedClasses = classes;
    }

    lookUpClassesByName(name: string) {
        this.classesService.lookUpByName(name)
            .subscribe((data) => {
                this.classes = data.classes;
            })
    }

    filterTeachers() {
        const newParams = this.queryService.addToCurrentParam({ ...this.filterTeacherForm.value, page: 1 });
        this.navigationService.toRoute('teachers', newParams, true);
    }
}