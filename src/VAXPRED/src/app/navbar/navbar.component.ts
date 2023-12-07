import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KafkaUtils } from '../../kafkaUtils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    kafkaUtils: KafkaUtils;
  
    constructor(private http: HttpClient) {
      this.kafkaUtils = new KafkaUtils(http);
    }
  
    onButtonClick(event: any) {
      console.log("event for kafka: ", event);
      this.kafkaUtils.sendEventToKafka(event);
    }

}
