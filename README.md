# steps for initialize project
1. install dependencies|
``` bash
npm install
```
2. config environment variables
3. run docker (need have docker desktop)

``` bash
docker compose up -d
```

4. run migrations

``` bash
npx prisma migrate dev
```

5. run server

``` bash
npm run dev
``` 

