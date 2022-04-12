import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'app-apollo-test',
  templateUrl: './apollo-test.component.html',
  styleUrls: ['./apollo-test.component.scss']
})
export class ApolloTestComponent implements OnInit {

  rates: any[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.query();
  }

  query(){
    this.apollo
      .watchQuery({
        query: gql`
        {
          allBooks{
            title
          }
        }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        console.log(result);
        
        this.rates = result?.data?.rates;
        this.loading = result.loading;
        this.error = result.error;
      });
  }
}

