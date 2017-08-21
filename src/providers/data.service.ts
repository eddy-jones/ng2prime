import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { CccDataSourceColumn, CCCDataSource, Room } from '../objects';
import { FilterMetadata } from 'primeng/primeng';


// some test http calls to return data in JSON format from the web service
@Injectable()
export class DataService {

    private authHeader: Headers;
    public serviceUrl: string;
    constructor(public http: Http) {

    }

    public loadAllDataSources(): Promise<CCCDataSource[]> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.get('http://35.176.21.120:8181/prosolution/odata/CCCDataSource?$select=DataSourceID,DataSourceName', { headers: headers })
            .toPromise()
            .then(res => <CCCDataSource[]>res.json().value);
    }

    public loadDataSource(ds: string): Promise<CCCDataSource> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.get("http://35.176.21.120:8181/prosolution/odata/CCCDataSource?$filter=DataSourceID eq guid'" + ds + "'", { headers: headers })
            .toPromise()
            .then(res => <CCCDataSource>res.json().value);
    }

    public getDataSourceFromName(dsName: string): Promise<CCCDataSource> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.get("http://35.176.21.120:8181/prosolution/odata/CCCDataSource?$filter=DataSourceName eq '" + dsName + "'", { headers: headers })
            .toPromise()
            .then(res => res.json().value);
    }

    public loadDataSourceColumns(ds: string): Promise<CccDataSourceColumn[]> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.get("http://35.176.21.120:8181/prosolution/odata/CCCDataSourceColumn?$filter=DataSourceID eq guid'" + ds + "'", { headers: headers })
            .toPromise()
            .then(res => <CccDataSourceColumn[]>res.json().value);
    }

    getRoomsMedium(): Promise<Room[]> {
        return this.http.get('http://35.176.21.120:8181/prosolution/odata/Rooms?$top=20')
            .toPromise()
            .then(res => <Room[]>res.json().value);
    }

    getRoomMetaData(): Promise<any> {
        return this.loadDataSourceColumns('F2F956B0-AF18-4ACF-8058-796F132794A8');
    }

    getRowCount(datasource: string): Promise<Number> {
        const query: string = 'http://35.176.21.120:8181/prosolution/odata/' + datasource + '?$inlinecount=allpages&$skip=0&$top=0';
        return this.http.get(query)
            .toPromise()
            .then(res => res.json()['odata.count'])
            .then(data => Number(data));
    }
    loadData(dataSource: string, top: number, skip: number, filter: FilterMetadata, sortField: string, sortDir: string, cols: any[]): Promise<any> {
        // HACK: should pluralise datasource
        if (['Room', 'Student'].indexOf(dataSource) >= 0) {
            dataSource += 's';
        }
        // base query
        let query: string = 'http://35.176.21.120:8181/prosolution/odata/' + dataSource + '?$inlinecount=allpages&$top=' + top + '&$skip=' + skip + '&$orderby=' + sortField + ' ' + sortDir;

        // add filters
        if (Object.keys(filter).length > 0) {
            query += "&$filter=substringof('" + (<any>Object).values(filter)[0].value + "'," + (<any>Object).keys(filter)[0] + ")";
        }
        // only load visible cols
        if (cols.length > 0) {
            const colsArr: string[] = [];
            cols.forEach(function (arrayItem) {
                colsArr.push(arrayItem.field);
            });
            const col: string = colsArr.join(',');

            query += '&$select=' + col;
        }
        return this.http.get(query)
            .toPromise()
            .then(res => res.json().value);
    }

}
