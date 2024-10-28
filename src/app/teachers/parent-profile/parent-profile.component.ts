import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Parent, Student } from '../../shared/types';
import { Location } from '@angular/common';
import { AddParentComponent } from '../teacher-add/teacher-add.component';
import { ParentsService } from '../services/teacher.service';
import { ItemTableComponent } from '../../shared/components/item-table/item-table.component';
import { StudentService } from '../../students/service/student.service';

@Component({
    standalone: true,
    imports: [ItemTableComponent],
    selector: 'sman-parent-profile',
    templateUrl: 'parent-profile.component.html'
})

export class ParentProfileComponent implements OnInit {
    parentId: string = '';
    parent: Parent | null = null;
    students: Student[] = [];

    constructor(
        private route: ActivatedRoute,
        private parentService: ParentsService,
        private studentService: StudentService,
        private location: Location
    ) { }

    ngOnInit() {
        // this.route.paramMap.subscribe((param) => {
        //     let parentId = param.get('id')
        // if (parentId) {
        //     this.parentService.getParent(parentId).subscribe((parent) => {
        //         this.parent = parent
        //     })
        // }
        // })
        this.fetchParent();
        this.fetchStudentsByParent();
    }

    fetchParent() {
        this.parentId = this.route.snapshot.params['id'];
        if (this.parentId) {
            this.parentService.getParent(this.parentId).subscribe((parent) => {
                this.parent = parent
            })
        }
    }

    fetchStudentsByParent() {
        this.studentService.lookUpStudentsByParent(this.parentId)
            .subscribe((students) => {
                this.students = students
            })
    }

    goBack() {
        this.location.back();
    }
}