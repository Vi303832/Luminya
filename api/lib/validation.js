/**
 * API Request Validation - Zod Schemas
 */

import { z } from 'zod';

const MAX_STRING_LENGTH = {
  orderId: 64,
  email: 100,
  userName: 60,
  userPhone: 20,
  idempotencyKey: 128
};

const paytrItemSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(200).trim(),
  price: z.number().positive().finite(),
  quantity: z.number().int().positive().max(99)
});

export const paytrInitBodySchema = z.object({
  items: z
    .array(paytrItemSchema)
    .min(1, 'En az bir ürün gerekli')
    .max(20, 'En fazla 20 ürün'),
  total: z.number().positive().finite(),
  email: z.string().email().max(MAX_STRING_LENGTH.email).toLowerCase().trim(),
  userName: z.string().max(MAX_STRING_LENGTH.userName).trim().optional().default(''),
  userPhone: z
    .string()
    .max(MAX_STRING_LENGTH.userPhone)
    .regex(/^[\d\s+()-]*$/, 'Geçersiz telefon formatı')
    .trim()
    .optional()
    .default('')
});

export const idempotencyKeySchema = z
  .string()
  .min(16, 'Idempotency-Key en az 16 karakter olmalı')
  .max(MAX_STRING_LENGTH.idempotencyKey)
  .regex(/^[a-zA-Z0-9_-]+$/, 'Geçersiz Idempotency-Key formatı')
  .optional();

export function validatePaytrInit(body) {
  const result = paytrInitBodySchema.safeParse(body);
  if (!result.success) {
    const first = result.error.errors[0];
    return { error: first?.message || 'Geçersiz istek verisi', details: result.error.flatten() };
  }
  return { data: result.data };
}

export function validateIdempotencyKey(header) {
  if (!header) return { data: null };
  const result = idempotencyKeySchema.safeParse(header);
  if (!result.success) {
    return { error: 'Geçersiz Idempotency-Key' };
  }
  return { data: result.data };
}

export const paytrCallbackBodySchema = z.object({
  merchant_oid: z.string().min(1).max(64),
  status: z.enum(['success', 'failed']),
  total_amount: z.string().regex(/^\d+$/),
  hash: z.string().min(1)
});

export function validatePaytrCallback(body) {
  const result = paytrCallbackBodySchema.safeParse(body);
  if (!result.success) {
    return { error: 'Geçersiz callback verisi' };
  }
  return { data: result.data };
}
