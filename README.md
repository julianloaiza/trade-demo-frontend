# Trade Demo Frontend

An Angular application that consumes real-time trading data from a Spring Boot backend. This project demonstrates the integration of **simulated** FIX (Financial Information eXchange) messages with real-time trading data streaming using Server-Sent Events (SSE). The application groups trades by account and security, displaying positions in real-time.

> **Note**: This is an educational exercise. The Kafka functionality and REST API calls are simulated implementations, not real Kafka or external REST services.

## Overview

This frontend application serves as a trading visualization system that:
- Connects to the Spring Boot backend via Server-Sent Events (SSE)
- Groups trades by account and security
- Displays trading positions in real-time
- Automatically updates the interface when new data arrives

## Features

- **Real-Time Streaming**: Consumes trading data via SSE from the backend
- **Trade Grouping**: Groups trades by account and security
- **Position Calculation**: Calculates and displays the number of shares per position
- **Automatic Updates**: Interface that updates in real-time
- **Backend Integration**: Connects with the [Trade Demo Backend](https://github.com/tu-usuario/trade-demo-backend)

## Prerequisites

- Node.js 18+
- Angular CLI 20.3.3+
- Trade Demo Backend running on `http://localhost:8080`

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd trade-demo-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Ensure the backend is running**
   
   The backend must be running on `http://localhost:8080`. See the [Backend README](https://github.com/tu-usuario/trade-demo-backend) for installation instructions.

4. **Run the application**
   ```bash
   ng serve
   ```

   The application will be available at `http://localhost:4200`

## Project Structure

```
src/app/
├── core/
│   ├── models/
│   │   ├── trade-message.ts       # TradeMessage interface
│   │   └── position.ts            # Position interface
│   └── services/
│       └── trade-stream.service.ts # SSE connection service
├── features/
│   └── positions/
│       ├── positions.component.ts  # Main positions component
│       └── positions.component.html # Positions table template
├── app.ts                          # Root component
├── app.config.ts                   # Application configuration
├── app.html                        # Root template
├── app.routes.ts                   # Routing configuration
└── app.scss                        # Global styles
```

## Main Features

### Positions Dashboard
- **Real-Time Positions Table**: Displays all current trading positions
- **Account & Security Grouping**: Groups trades by account and security ID
- **Position Calculation**: Automatically calculates net positions (sums quantities)
- **Visual Indicators**: Color-coded positions (green for positive, red for negative)
- **Search & Sort**: Filter by account/security and sort by position or last updated
- **Dark/Light Mode**: Toggle between themes using PrimeNG

### Streaming Service
```typescript
@Injectable()
export class TradeStreamService {
  trades(): Observable<TradeMessage> {
    return new Observable<TradeMessage>((subscriber) => {
      this.es = new EventSource('http://localhost:8080/api/stream');
      // Handles SSE connection and trade data parsing
    });
  }
}
```

### Position Management
- **Automatic Updates**: Positions update in real-time as new trades arrive
- **Net Position Calculation**: Accumulates quantities for each account-security pair
- **Last Updated Tracking**: Shows when each position was last modified
- **Visual Status**: Icons and colors indicate position status (long/short/flat)

### Data Structures

The application uses the following TypeScript interfaces:

**TradeMessage Interface:**
```typescript
interface TradeMessage {
  tradeId: string;
  account: string;
  securityId: string;
  idSource?: string;
  qty: number;
  price: number;
  ric?: string;
  ticker?: string;
  isin?: string;
  cusip?: string;
  sedol?: string;
}
```

**Position Interface:**
```typescript
interface Position {
  key: string;        // `${account}-${securityId}`
  account: string;
  securityId: string;
  totalShares: number;
  lastUpdated: Date;
}
```

## Application Usage

### Connect to Backend

1. **Start the Backend**: Ensure the backend is running
2. **Start the Frontend**: Run `ng serve`
3. **Navigate to Application**: Open `http://localhost:4200`

### Send Test Data

You can send FIX messages to the backend to see real-time data:

```bash
curl --location 'http://localhost:8080/api/fix' \
--header 'Content-Type: application/json' \
--data '{
    "17": "EXEC123456",
    "48": "2323", 
    "22": "SEDOL",
    "1": "123123",
    "32": "1200",
    "6": "150.25",
    "8": "BUY"
}'
```

## Development

### Running Tests
```bash
ng test
```

### Building for Production
```bash
ng build --prod
```

### Generating Components
```bash
ng generate component component-name
```

## Backend Integration

This frontend application is designed to work with the [Trade Demo Backend](https://github.com/tu-usuario/trade-demo-backend). The backend's SSE endpoint (`/api/stream`) provides real-time trading data that is consumed by Angular services using `EventSource`.

### Backend Endpoints Used

- **GET /api/stream**: Server-Sent Events for trade streaming
- **GET /api/health**: Service status verification
- **POST /api/fix**: FIX message injection for testing

## Implementation Details

### Core Components

1. **Data Streaming**: The `TradeStreamService` connects to the backend's SSE endpoint (`/api/stream`) to receive real-time trade updates using `EventSource`.

2. **Position Management**: The `PositionsComponent` automatically groups trades by account and security, calculating net positions using a `Map<string, Position>`.

3. **Real-Time UI**: Uses Angular signals (`signal()`) for reactive updates when new trade data arrives.

4. **PrimeNG Integration**: Utilizes PrimeNG components for the data table, search functionality, and dark/light theme toggle.

### Key Technologies

- **Angular Signals**: For reactive state management
- **PrimeNG**: UI component library with Aura theme
- **Server-Sent Events**: Real-time data streaming
- **TypeScript**: Strong typing for data models
- **Standalone Components**: Modern Angular architecture

## Exercise Being Solved

This frontend completes the Angular exercise that requires:

- **Angular Component**: HTML and TypeScript that groups trades by account and security
- **Position Visualization**: Display the number of shares per position
- **Real-Time Updates**: UI that updates automatically
- **lastUpdated Field**: Inform users when the position was last updated

## Key Dependencies

- **Angular 20.3.3**: Core framework with standalone components
- **PrimeNG**: UI component library with Aura theme
- **RxJS**: Reactive programming for observables and streaming
- **TypeScript**: Strong typing and modern JavaScript features
- **Angular CLI**: Development and build tools

## License

This project is for educational/demonstration purposes.

---

**Backend Required**: This frontend requires the [Trade Demo Backend](https://github.com/tu-usuario/trade-demo-backend) to be running to function correctly.
