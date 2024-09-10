import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

// Обработчик POST-запросов
export async function POST(req: Request) {
  try {
    const body = await req.json() // Чтение данных из запроса
    const { name, email } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    // Создание пользователя в базе данных
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    })

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 })
  }
}

// Обработчик для методов, отличных от POST
export async function GET() {
  return NextResponse.json({ message: 'Only POST requests are allowed' }, { status: 405 })
}
