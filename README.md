# Sveltekitten Template

เทมเพลต SvelteKit พร้อมของใช้งานครบสำหรับงานแอปจริง: Routing, Auth, API Proxy, OpenAPI Client, i18n, UI, และ DevX ที่ดี ตั้งค่ามาให้พร้อมใช้งานทันที

## คุณสมบัติหลัก

- SvelteKit v2 + Svelte 5 + Vite 7 (Adapter: Node)
- Tailwind CSS v4 (ปลั๊กอินทาง Vite) + ชุดคอมโพเนนต์ UI ใน `src/lib/components/ui`
- TanStack Query (Svelte) พร้อม Provider และตัวอย่างการใช้งาน
- i18n ด้วย Paraglide.js + โครง `project.inlang/` และไฟล์แปล `messages/`
- Superforms + Zod สำหรับแบบฟอร์ม/วาลิเดชัน (ตัวอย่างหน้า Login)
- API Proxy ไปหา Backend (เช่น FastAPI) พร้อมการ Refresh Token อัตโนมัติ
- OpenAPI Client ด้วย `openapi-fetch` + สร้าง Type จาก `openapi-typescript`
- Logger (pino/pino-pretty) และ Utilities สำหรับ Cookies/Auth

---

## โครงสร้างโปรเจกต์ (ย่อ)

```
src/
	app.html, app.css
	hooks.server.ts          # รวม middleware: AuthGuard, i18n (Paraglide), FastAPI client
	lib/
		api/
			api.ts               # Generic API client
			fastapi-client.ts    # OpenAPI client ไป proxy /api/proxy
			pokemon-api.ts       # ตัวอย่าง REST client ภายนอก
			paths/fastapi.d.ts   # Type ที่ generate จาก OpenAPI
		components/ui/...      # คอมโพเนนต์ UI (button, card, dropdown, ...)
		hooks/
			auth-guard.ts        # ป้องกัน route กลุ่ม (auth)
			fastapi.hook.ts      # ยัด client เข้าสู่ event.locals
		paraglide/...          # ไฟล์ที่ generate จาก Paraglide
		schemas/auth.schema.ts # Zod schema สำหรับ Login
		utils/
			api-core.ts          # ApiError
			cookies.ts           # ตัวเลือก cookie มาตรฐาน
			auth.ts              # จัดการโทเคน/ตรวจหมดอายุ/ชื่อคุกกี้
	routes/
		+layout.svelte / +layout.ts
		+page.svelte
		(auth)/home/+page.svelte    # ตัวอย่างหน้าในกลุ่มต้องล็อกอิน
		api/proxy/[...slug]/+server.ts # API Proxy + refresh token
		demo/
			+page.svelte
			paraglide/+page.svelte
			pokemons/ (ตัวอย่างการเรียก API ภายนอก)
		login/
			+page.svelte / +page.server.ts / login-form.svelte
```

---

## เริ่มต้นใช้งาน

รองรับ npm/pnpm/bun เลือกอย่างใดอย่างหนึ่ง (ตัวอย่างใช้ bun) — คำสั่งด้านล่างใช้ได้กับ fish shell

ติดตั้งแพ็กเกจ:

```fish
bun install
```

ตั้งค่า Environment (สำคัญ):

สร้างไฟล์ `.env.local` (หรือเซ็ตในระบบของคุณ) อย่างน้อยสองตัวแปรนี้

```ini
# ชื่อแอป (แสดงใน <title>)
PUBLIC_APP_TITLE=Sveltekitten

# ต้นทาง Backend API ของคุณ (เช่น FastAPI)
# ใช้ร่วมกับ proxy: /api/proxy/**
BACKEND_API_URL=http://localhost:8000
```

โหมดพัฒนา:

```fish
bun run dev
```

Build และ Preview โปรดักชัน:

```fish
bun run build
bun run preview
```

ตรวจโค้ด/ลินต์/ฟอร์แมต:

```fish
bun run check
bun run lint
bun run format
```

Generate OpenAPI Types (ต้องมีเซิร์ฟเวอร์ Backend รันที่ BACKEND_API_URL):

```fish
# ตัวอย่าง script ที่เตรียมไว้ (ยิงไปที่ http://localhost:8000/openapi.json)
bun run openapi:fastapi
```

---

## สคริปต์ที่ใช้บ่อย (จาก package.json)

- dev: `vite dev`
- build: `vite build`
- preview: `vite preview`
- check / check:watch: `svelte-check`
- lint: `prettier --check` + `eslint .`
- format: `prettier --write .`
- openapi / openapi:fastapi: สร้าง Type จาก OpenAPI

---

## การตั้งค่า ENV ที่ใช้ในโปรเจกต์

- PUBLIC_APP_TITLE: ชื่อแอปฝั่ง Public (อ่านผ่าน `$env/dynamic/public`)
- BACKEND_API_URL: URL ของ Backend (อ่านผ่าน `$env/dynamic/private` ใน proxy)

ตัวอย่างการตั้งค่าแบบชั่วคราวใน fish shell (ถ้าไม่ใช้ไฟล์ .env):

```fish
set -x PUBLIC_APP_TITLE "Sveltekitten"
set -x BACKEND_API_URL "http://localhost:8000"
```

---

## Flow สำคัญในแอปนี้

1) Hooks กลาง (`src/hooks.server.ts`)

- รวม middleware ด้วย `sequence(...)` ตามลำดับ:
	- Auth Guard: ตรวจจับเส้นทางที่ต้องล็อกอิน (กลุ่ม `(auth)`) ถ้าไม่มี/หมดอายุ refresh token จะเด้งไป `/login`
	- Paraglide: ผูก locale ให้กับ SvelteKit response
	- FastAPI Client: สร้าง client และเก็บไว้ที่ `event.locals.fastapiClient`

2) API Proxy (`/routes/api/proxy/[...slug]/+server.ts`)

- ส่งต่อคำขอไป `BACKEND_API_URL/{slug}` พร้อมแนบ `Authorization: Bearer <access_token>` ถ้ามี
- ถ้าได้ 401 และมี refresh token จะลองยิง `/auth/refresh` เพื่อออก access token ใหม่ แล้วรีทริกคำขอเดิมให้อัตโนมัติ
- ถ้า refresh ไม่สำเร็จ จะล้างคุกกี้และคืนค่าเดิมจาก API

3) การล็อกอินและคุกกี้

- หน้า `/login` ใช้ Superforms + Zod (`loginSchema`) ส่งไปที่ action ใน `+page.server.ts`
- เมื่อสำเร็จ เซ็ตคุกกี้ชื่อ `access_token` และ `refresh_token` (อายุสั้น/ยาวตามที่กำหนดใน `utils/cookies.ts` และ `utils/auth.ts`) แล้ว redirect ไป `/home`
- กำหนดเส้นทางที่ต้องล็อกอินไว้ใต้โฟลเดอร์ `(auth)` (เช่น `(auth)/home`)

---

## การใช้งาน API Client

มีให้เลือกสองแบบตามงาน:

1) OpenAPI Client (แนะนำเมื่อมีสคีมา):

- ใช้งานผ่าน `src/lib/api/fastapi-client.ts`
- ฝั่งเซิร์ฟเวอร์เข้าถึงผ่าน `locals.fastapiClient` (ถูกเตรียมไว้ใน hook) เช่นใน action ของหน้า Login:

```ts
const result = await locals.fastapiClient.POST('/auth/login', { body: { email, password } });
```

2) Generic REST Client:

- ใช้ `src/lib/api/api.ts` เพื่อสร้าง client กำหนด `baseUrl` เอง
- ตัวอย่าง `pokemon-api.ts` เรียก PokeAPI:

```ts
import { pokemonApi } from '$lib/api/pokemon-api';
const data = await pokemonApi.get('/pokemon', { /* options */ });
```

---

## i18n ด้วย Paraglide.js

- แหล่งไฟล์แปลอยู่ใน `messages/` (เช่น `en.json`, `th.json`)
- คอนฟิกโปรเจกต์อยู่ที่ `project.inlang/`
- เมื่อ build/dev ปลั๊กอิน `paraglideVitePlugin` จะ generate โค้ดให้อัตโนมัติลง `src/lib/paraglide/`
- มีตัวอย่างหน้าใน `/demo/paraglide`

เพิ่มภาษาใหม่แบบคร่าว ๆ:

1) สร้างไฟล์ `messages/<lang>.json`
2) อัปเดตการตั้งค่าใน `project.inlang/settings.json` ตามต้องการ
3) รัน dev/build ให้ปลั๊กอิน generate โค้ดใหม่

---

## UI และสไตล์

- Tailwind CSS v4 ผ่านปลั๊กอิน `@tailwindcss/vite` (ไม่ต้องมีไฟล์ config แยก)
- ชุดคอมโพเนนต์ UI อยู่ใน `src/lib/components/ui/*` (เช่น `button`, `card`, `dropdown-menu`, ...)
- มี Toaster (sonner) ติดตั้งไว้แล้วใน `+layout.svelte`

---

## Demo ที่ให้มา

- `/demo` หน้ารวมลิงก์
- `/demo/pokemons` ตัวอย่างเรียก REST ภายนอก
- `/login` ตัวอย่างหน้าเข้าสู่ระบบด้วย Superforms + Zod + FastAPI
- `/api/proxy/**` ทดสอบ proxy ไปยัง Backend ของคุณ (ต้องตั้งค่า `BACKEND_API_URL`)

---

## Deploy

โปรเจกต์ใช้ `@sveltejs/adapter-node` ดังนั้นผลลัพธ์จะเป็นแอป Node.js

1) สร้างไฟล์โปรดักชัน

```fish
bun run build
```

2) รันเซิร์ฟเวอร์ (ตัวอย่างด้วย `bun` หรือ `node` ผ่าน preview):

```fish
bun run preview
```

หรือคุณอาจตั้งค่าโปรเซสจัดการด้วย PM2/Docker ตามสภาพแวดล้อมของคุณ โดยตั้ง ENV `BACKEND_API_URL` ในเครื่องปลายทางด้วย

---

## Tips & Troubleshooting

- 401 จาก API Proxy บ่อย ๆ: ตรวจว่า `refresh_token` ยังไม่หมดอายุ และจุดออกโทเคน `/auth/refresh` ของ Backend ทำงานถูกต้อง
- ปัญหา CORS: ใช้ผ่าน proxy `/api/proxy/**` เพื่อลด CORS ฝั่งเบราว์เซอร์
- Type ของ OpenAPI ไม่ตรง: รัน `bun run openapi:fastapi` ใหม่หลัง Backend เปลี่ยนสคีมา
- ชื่อคุกกี้มาตรฐาน: `access_token`, `refresh_token`

---

## สารบัญสคริปต์อย่างรวดเร็ว

```txt
dev       เริ่มโหมดพัฒนา
build     สร้างไฟล์โปรดักชัน
preview   เปิดรันโปรดักชันแบบโลคอล
check     ตรวจ type และ Svelte
lint      ตรวจโค้ดด้วย prettier + eslint
format    จัดรูปแบบโค้ดด้วย prettier
openapi   เรียก openapi-typescript
```

---

ขอให้สนุกกับการพัฒนา! หากต้องการเพิ่มเอกสาร/ตัวอย่างเพิ่มเติม แจ้งไว้ใน Issues/PR ได้เลย
