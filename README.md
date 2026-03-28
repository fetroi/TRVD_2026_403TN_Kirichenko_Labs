# TRVD_2026_403-ТН_Кириченко_Labs

Лабораторні роботи 1-5 з дисципліни **ТРВЗД** (вебпроєкт **FootballHub**).

## Дані студента
* **ПІБ:** Кириченко Сергій Васильович
* **Група:** 403-ТН
* **Репозиторій:** [https://github.com/fetroi/TRVD_2026_403TN_Kirichenko_Labs](https://github.com/fetroi/TRVD_2026_403TN_Kirichenko_Labs)
* **Демонстраційне відео (ЛР5):** [https://youtu.be/yRMgEhQp0MA](https://youtu.be/yRMgEhQp0MA)

---

## Структура проєкту

* **lab1/Звіт.md** — Аналіз предметної області: управління футбольним складом.
* **lab1/Контрольні_питання.md**
* **lab2/Звіт.md** — Проєктування бази даних (ER-модель таблиці players).
* **lab2/Контрольні_питання.md**
* **lab3/Звіт.md** — Підключення до Supabase та налаштування таблиць.
* **lab3/Контрольні_питання.md**
* **lab4/Звіт.md** — Автентифікація користувачів та політика безпеки RLS (Row Level Security).
* **lab4/Контрольні_питання.md**
* **lab5/Звіт.md** — Клієнтська частина: панель керування, фільтрація гравців та анімація.
* **lab5/Контрольні_питання.md**

**Вихідний код:**
* **frontend/** — React-додаток (Vite).
* **frontend/src/api/supabase.js** — конфігурація зв'язку з базою даних.

---

## Швидкий запуск

### 1. Налаштування середовища
Створіть файл `.env` у папці `frontend/` та додайте свої ключі:

```env
VITE_SUPABASE_URL=https://qiqulmeabyftyztlzzbu.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpcXVsbWVhYnlmdHl6dGx6emJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2Mjg3OTAsImV4cCI6MjA5MDIwNDc5MH0.4FO_ijDA4V0CTr_iDwQFdEdZiCikxNbCcKsT54JxCdc

Перейдіть у потрібну папку проєкту:

cd football-hub-connect/frontend

Встановіть залежності:

npm install

Запустіть локальний сервер:

npm run dev