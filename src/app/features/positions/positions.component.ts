import { Component, OnInit, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TradeStreamService } from '../../core/services/trade-stream.service';
import { TradeMessage } from '../../core/models/trade-message';
import { Position } from '../../core/models/position';

@Component({
  selector: 'app-positions',
  standalone: true,
  imports: [TableModule, InputTextModule, IconFieldModule, InputIconModule, DatePipe, DecimalPipe],
  templateUrl: './positions.component.html',
})
export class PositionsComponent implements OnInit {
  private positionsMap = new Map<string, Position>();
  positionsArray = signal<Position[]>([]);

  constructor(private stream: TradeStreamService) {}

  ngOnInit(): void {
    this.stream.trades().subscribe((trade) => this.updatePosition(trade));
  }

  private updatePosition(trade: TradeMessage) {
    const key = `${trade.account}-${trade.securityId}`;
    const now = new Date();
    const existing = this.positionsMap.get(key);

    if (!existing) {
      this.positionsMap.set(key, {
        key,
        account: trade.account,
        securityId: trade.securityId,
        totalShares: trade.qty,
        lastUpdated: now,
      });
    } else {
      existing.totalShares += trade.qty;
      existing.lastUpdated = now;
    }

    this.positionsArray.set(Array.from(this.positionsMap.values()));
  }

  getPositionClass(totalShares: number): string {
    return totalShares > 0 
      ? 'bg-green-100 text-green-800 border border-green-200'
      : totalShares < 0 
        ? 'bg-red-100 text-red-800 border border-red-200'
        : 'bg-gray-100 text-gray-600 border border-gray-200';
  }

  getPositionIcon(totalShares: number): string {
    return totalShares > 0 
      ? 'pi pi-arrow-up'
      : totalShares < 0 
        ? 'pi pi-arrow-down'
        : 'pi pi-minus';
  }
}
