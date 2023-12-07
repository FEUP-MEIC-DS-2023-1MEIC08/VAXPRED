import { HttpClient } from '@angular/common/http';


export class KafkaUtils {
    constructor(private http: HttpClient) { }

    sendEventToKafka(event: any) {
      const apiUrl = 'http://localhost:9092/topics/mytopic';  // wrong url
      const headers = { 'Content-Type': 'application/vnd.kafka.json.v2+json' };
      const body = {
        records: [
          { value: event }
        ]
      };
    
      this.http.post(apiUrl, body, { headers }).subscribe(response => {
        console.log(response);
      });
    }
}

