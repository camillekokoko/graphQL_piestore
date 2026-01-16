# GraphQL Foundations – Self Learning Project

This repository contains **self-learning materials and experiments** based on a **GraphQL Foundations course**.

**Project path:** `GraphQL-Foundations`

---

## 🚀 Getting It Running

```bash
npm init -y
npm install
npm run start
```

> Make sure your `package.json` includes:

```json
{
  "type": "module",
  "scripts": {
    "start": "node server.mjs"
  }
}
```

---

## 📦 Install Dependencies

### Core GraphQL & Yoga (v3)

```bash
npm install graphql graphql-yoga
```

### Schema Utilities

```bash
npm install @graphql-tools/schema
```

### Subscriptions (WebSocket support)

```bash
npm install ws graphql-ws
```

---

## 🔌 Port Management

If port **4000** is already in use:

### Check which process is using the port

```bash
lsof -i :4000
```

### Kill the process

```bash
kill -9 <PID>
```

Replace `<PID>` with the process ID returned from the command above.

---

## 📚 Notes

* This project is intended for **learning and experimentation**
* Uses **GraphQL Yoga v3**
* Data is stored **in-memory** (server restart resets data)
* Includes examples of:

  * Queries
  * Mutations
  * Subscriptions
