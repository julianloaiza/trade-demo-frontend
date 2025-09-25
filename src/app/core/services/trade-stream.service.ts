import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { TradeMessage } from '../models/trade-message';

@Injectable({ providedIn: 'root' })
export class TradeStreamService implements OnDestroy {
  private es?: EventSource;

  trades(): Observable<TradeMessage> {
    return new Observable<TradeMessage>((subscriber) => {
      this.es = new EventSource('http://localhost:8080/api/stream');

      this.es.addEventListener('trade', (evt: MessageEvent) => {
        try {
          const data = JSON.parse(evt.data) as TradeMessage;
          subscriber.next(data);
        } catch (e) {
          console.error('Bad trade payload', e);
        }
      });

      this.es.onerror = (err) => {
        console.error('SSE error', err);
      };

      return () => this.es?.close();
    });
  }

  ngOnDestroy(): void {
    this.es?.close();
  }
}
