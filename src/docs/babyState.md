```mermaid
---
title: Baby State Diagram 
config:
  layout: elk
  look: handDrawn
  theme: dark
---
  stateDiagram-v2

  [*] --> Idle
  Idle --> Move : moveToTile
  Move --> Play : pickupToy
  Play --> Idle : dropToy
```
