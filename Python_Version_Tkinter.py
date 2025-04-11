import tkinter as tk
from tkinter import ttk
import random

# Список слов для изучения (русское слово: английский перевод)
vocabulary = {
    'Привет': 'Hello',
    'Спасибо': 'Thank you',
    'Пожалуйста': 'Please/You\'re welcome',
    'До свидания': 'Goodbye',
    'Да': 'Yes',
    'Нет': 'No',
    'Извините': 'Sorry/Excuse me',
    'Как дела?': 'How are you?',
    'Хорошо': 'Good',
    'Плохо': 'Bad',
    'Я не понимаю': 'I don\'t understand',
    'Помогите': 'Help',
    'Сколько это стоит?': 'How much is this?',
    'Где находится туалет?': 'Where is the bathroom?',
    'Меню, пожалуйста': 'Menu, please',
    'Я люблю тебя': 'I love you',
    'Доброе утро': 'Good morning',
    'Добрый вечер': 'Good evening',
    'Спокойной ночи': 'Good night',
    'Поздравляю': 'Congratulations'
}


class RussianLearningApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Учебное приложение для изучения русского языка")
        self.root.geometry("600x400")

        # Создание вкладок
        self.tab_control = ttk.Notebook(self.root)

        self.tab_vocabulary = ttk.Frame(self.tab_control)
        self.tab_quiz = ttk.Frame(self.tab_control)
        self.tab_flashcards = ttk.Frame(self.tab_control)

        self.tab_control.add(self.tab_vocabulary, text='Словарь')
        self.tab_control.add(self.tab_quiz, text='Викторина')
        self.tab_control.add(self.tab_flashcards, text='Карточки')

        self.tab_control.pack(expand=1, fill='both')

        self.create_vocabulary_tab()
        self.create_quiz_tab()
        self.create_flashcards_tab()

    def create_vocabulary_tab(self):
        # Создание таблицы для отображения слов
        columns = ('Русское слово', 'Перевод')
        tree = ttk.Treeview(self.tab_vocabulary, columns=columns, show='headings')
        for col in columns:
            tree.heading(col, text=col)
            tree.column(col, width=200, anchor='center')

        # Вставка слов в таблицу
        for rus, eng in vocabulary.items():
            tree.insert('', tk.END, values=(rus, eng))

        tree.pack(expand=True, fill='both', padx=10, pady=10)

    def create_quiz_tab(self):
        self.quiz_score = 0
        self.quiz_total = 0

        self.current_question = {}
        self.create_new_question()

        # Вопрос
        self.question_label = ttk.Label(self.tab_quiz, text="", font=('Arial', 14))
        self.question_label.pack(pady=20)

        # Поле ввода ответа
        self.answer_var = tk.StringVar()
        self.answer_entry = ttk.Entry(self.tab_quiz, textvariable=self.answer_var, font=('Arial', 12))
        self.answer_entry.pack(pady=10)

        # Кнопка проверки
        self.check_button = ttk.Button(self.tab_quiz, text="Проверить", command=self.check_answer)
        self.check_button.pack(pady=10)

        # Результат
        self.result_label = ttk.Label(self.tab_quiz, text="", font=('Arial', 12))
        self.result_label.pack(pady=10)

        # Счет
        self.score_label = ttk.Label(self.tab_quiz, text="Правильных ответов: 0 из 0", font=('Arial', 12))
        self.score_label.pack(pady=10)

    def create_new_question(self):
        self.current_question = random.choice(list(vocabulary.items()))

    def check_answer(self):
        user_answer = self.answer_var.get().strip().lower()
        correct_answer = self.current_question[1].lower()
        self.quiz_total += 1

        if user_answer == correct_answer:
            self.quiz_score += 1
            self.result_label.config(text="Правильно!", foreground='green')
        else:
            self.result_label.config(text=f"Неправильно! Правильный ответ: {self.current_question[1]}",
                                     foreground='red')

        self.score_label.config(text=f"Правильных ответов: {self.quiz_score} из {self.quiz_total}")

        # Создать новый вопрос
        self.create_new_question()
        self.question_label.config(text=f"Переведите на английский: {self.current_question[0]}")
        self.answer_var.set("")

    def create_flashcards_tab(self):
        self.flashcards = list(vocabulary.items())
        random.shuffle(self.flashcards)
        self.current_flashcard = {}

        # Функция для отображения следующей карточки
        def show_next_card():
            if self.flashcards:
                self.current_flashcard = self.flashcards.pop()
                self.card_label.config(text=self.current_flashcard[0])
                self.translation_label.config(text="")
            else:
                self.card_label.config(text="Карточки закончились!")
                self.translation_label.config(text="")
                self.next_button.config(state='disabled')

        # Отображение карточки
        self.card_label = ttk.Label(self.tab_flashcards, text="", font=('Arial', 20))
        self.card_label.pack(pady=50)

        # Кнопка показать перевод
        self.translation_label = ttk.Label(self.tab_flashcards, text="", font=('Arial', 16))
        self.translation_label.pack(pady=20)

        # Кнопки навигации
        self.next_button = ttk.Button(self.tab_flashcards, text="Следующая", command=show_next_card)
        self.next_button.pack(pady=10)

        self.show_translation_button = ttk.Button(self.tab_flashcards, text="Показать перевод",
                                                  command=lambda: self.translation_label.config(
                                                      text=self.current_flashcard[1]))
        self.show_translation_button.pack(pady=10)

        # Показать первую карточку
        show_next_card()


if __name__ == "__main__":
    root = tk.Tk()
    app = RussianLearningApp(root)
    root.mainloop()
