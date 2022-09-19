import express from 'express'
import cors from 'cors'

import { PrismaClient } from '@prisma/client'
import { convertHourStringToMinutesString } from './utils/convert-hour-string-to-minutes-string'
import { convertMinutesToHourString } from './utils/convert-minutes-to-hours-string'

const app = express()

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({
  log: ['query'],
})

app.get('/games', async (_request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  })
  return response.json(games)
})

app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedAds = ads.map((ad) => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),
    }
  })

  return response.json(formattedAds)
})

app.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id
  const { body } = request

  const {
    name,
    yearsPlaying,
    discord,
    weekDays,
    hourStart,
    hourEnd,
    useVoiceChannel,
    createdAt,
  } = body

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name,
      yearsPlaying,
      discord,
      weekDays: weekDays.join(','),
      hourStart: convertHourStringToMinutesString(hourStart),
      hourEnd: convertHourStringToMinutesString(hourEnd),
      useVoiceChannel,
      createdAt,
    },
  })

  return response.status(201).json(ad)
})

app.get('/ads', async (_request, response) => {
  const ads = await prisma.ad.findMany()
  return response.json(ads)
})

app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  })

  return response.json({
    discord: ad.discord,
  })
})

app.listen(3333, () => console.log('Server start on port 3333'))
