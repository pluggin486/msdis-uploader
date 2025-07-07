# 📁 File Upload Component

## 🛠️ Технологии

- **Vue.js 3** (Composition API)
- **TypeScript**
- **CSS** (чистый, без UI-библиотек)
- **Vite** (для сборки)

## 🎯 Цель

Создать универсальный, доступный и семантически корректный компонент загрузки файлов без использования готовых UI-библиотек. Компонент должен:

- Поддерживать загрузку одного/нескольких файлов.
- Валидировать типы и размер файлов.
- Обеспечивать интерактивность и обратную связь пользователю.

## 🚀 Запуск проекта

1. **Клонируйте репозиторий**:
   ```bash
   git clone https://github.com/your-username/file-upload-component.git
   cd file-upload-component
   ```

Установите зависимости:

npm install (yarn или другие пакетные менеджеры)

Запустите dev-сервер:

npm run dev

📝 Пример использования

```
<script lang="ts" setup>
import { ref } from 'vue'

const file = ref<File>()
</script>

<template>
  <div class="centered">
    <FileUploader v-model="file" label="Label" required />
  </div>
</template>

<style scoped>
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

```
