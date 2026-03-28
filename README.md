TRVD_2026_403-ТН_Kirichenko_Labs
Лабораторні роботи 1-5 з дисципліни TRVD (вебпроєкт FootballHub).

Дані студента
ПІБ: (Кириченко Сергій Васильович)
Група: (403ТН)

Репозиторій
([https://github.com/fetroi/TRVD_2026_403TN_Kirichenko_Labs])

Демо відео (ЛР5)
([https://youtu.be/yRMgEhQp0MA])

Структура проєкту
lab1/Звіт.md — Аналіз предметної області: керування футбольним складом.
lab1/Контрольні_питання.md
lab2/Звіт.md — Проєктування бази даних (ER-модель таблиці players).
lab2/Контрольні_питання.md
lab3/Звіт.md — Підключення до Supabase та налаштування таблиць.
lab3/Контрольні_питання.md
lab4/Звіт.md — Автентифікація користувачів та політики безпеки RLS (Row Level Security).
lab4/Контрольні_питання.md
lab5/Звіт.md — Клієнтська частина: Dashboard, фільтрація гравців та анімації.
lab5/Контрольні_питання.md

frontend/ — React додаток (Vite).
frontend/src/api/supabase.js — Конфігурація зв'язку з базою даних.

Швидкий запуск

1. Налаштування середовища
Створи файл .env у папці frontend/ та додай свої ключі:

Фрагмент кода

VITE_SUPABASE_URL=url_з_supabase
VITE_SUPABASE_ANON_KEY=ключ_з_supabase
2. Запуск Front-end
Bash

# Перейти у правильну папку проєкту
cd football-hub-connect/frontend 
# Встановити залежності
npm install
# Запустити локальний сервер
npm run dev