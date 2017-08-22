import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { CccDataSourceColumn, CCCDataSource } from '../../../objects';
import { DataService } from '../../../providers/data.service';
import { NotificationsService } from '../../../providers/notifications.service';
import { SelectItem, FilterMetadata } from 'primeng/primeng';

@Component({
    selector: 'app-ccc-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnChanges {
    @Input() dataSource: CCCDataSource;
    @Output() selectedItem: any;
    @Output() onRowSelected = new EventEmitter<any>();
    numberOfRows: Number = 20;
    showPaginator: Boolean = true;
    canResizeColumns: Boolean = true;
    rowPrimaryKey = '';
    columnOptions: SelectItem[] = [];
    allCols: any[] = [];
    visibleCols: any[] = [];
    data: any[] = [];

    constructor(private dataService: DataService, private notificationsService: NotificationsService) {

    }
    ngOnInit() {

    }
    ngOnChanges() {
        this.rowPrimaryKey = '';
        if (this.dataSource) {
            this.dataService.loadDataSourceColumns(this.dataSource.DataSourceID) // Get DataSource Columns
                .then((cols) => {
                    this.allCols = [];
                    this.columnOptions = [];
                    this.visibleCols = [];
                    // store metadata
                    cols.forEach((col: CccDataSourceColumn) => {
                        this.allCols.push(col); // Store list of all DataSource Columns (for toggling on/off and for setting required/caption etc.)
                        this.columnOptions.push({ label: col.Caption, value: col }); // Store the cols for the grid field picker (different format to allCols above)

                        if (col.ColumnType === 1) { // this would be a programatically determined array of cols to show
                            this.visibleCols.push({ field: col.DataSourceColumnName, header: col.Caption, filter: 'true' }); // visibleCols is what the grid displays
                        }
                        if (col.IsPrimaryKey && this.rowPrimaryKey === '') {
                            this.rowPrimaryKey = col.DataSourceColumnName;
                            console.log('Set primary key to: ' + col.DataSourceColumnName);
                        }
                    });
                })
                .then(() => {
                    // load grid data
                    this.dataService.loadData(this.dataSource.DataSourceName, 50, 0, {}, this.rowPrimaryKey, 'asc', [])
                        .then((res) => {
                            this.data = res;
                        });
                });
        }
    }

    onRowSelect(event) {
        this.selectedItem = event.data;
        this.onRowSelected.emit(event);
    }

    colsChanged($event) {
        this.visibleCols = [];
        $event.value.forEach((col) => {
            this.visibleCols.push({ field: col.DataSourceColumnName, header: col.Caption, filter: 'true' });
        });

    }


}
