import { describe, expect, it } from 'vitest';

import {
  buildGeneralQuoteMessage,
  buildQuoteMessage,
  buildServiceQuoteMessage,
  buildWhatsAppLink,
  isWhatsAppConfigured,
  normalizePhoneNumber,
} from './whatsapp';

describe('normalizePhoneNumber', () => {
  it('normaliza o formato brasileiro mais comum', () => {
    expect(normalizePhoneNumber('5521999999999')).toBe('5521999999999');
  });

  it('remove máscaras, espaços e o prefixo internacional 00', () => {
    expect(normalizePhoneNumber('+55 (21) 99999-9999')).toBe('5521999999999');
    expect(normalizePhoneNumber('0055 21 99999 9999')).toBe('5521999999999');
  });

  it('aceita telefone fixo com 10 dígitos nacionais', () => {
    expect(normalizePhoneNumber('552133334444')).toBe('552133334444');
  });

  it('recusa valores vazios, incompletos ou fora do Brasil', () => {
    expect(normalizePhoneNumber(undefined)).toBeNull();
    expect(normalizePhoneNumber('')).toBeNull();
    expect(normalizePhoneNumber('   ')).toBeNull();
    expect(normalizePhoneNumber('21999999999')).toBeNull();
    expect(normalizePhoneNumber('5511999999')).toBeNull();
    expect(normalizePhoneNumber('552199999')).toBeNull();
    expect(normalizePhoneNumber('1555123456789')).toBeNull();
  });

  it('recusa celular de 11 dígitos sem o nono dígito', () => {
    expect(normalizePhoneNumber('5521812345678')).toBeNull();
  });
});

describe('buildWhatsAppLink', () => {
  it('monta o link wa.me com a mensagem codificada', () => {
    const link = buildWhatsAppLink('5521999999999', 'Olá, Bujosa Clima!');

    expect(link).toBe(
      'https://wa.me/5521999999999?text=Ol%C3%A1%2C%20Bujosa%20Clima!',
    );
  });

  it('não cria link quando o número não está configurado', () => {
    expect(buildWhatsAppLink(null, 'Olá')).toBeNull();
    expect(buildWhatsAppLink('', 'Olá')).toBeNull();
    expect(buildWhatsAppLink('numero-invalido', 'Olá')).toBeNull();
  });
});

describe('mensagens', () => {
  it('descreve o serviço escolhido no link por serviço', () => {
    expect(buildServiceQuoteMessage('Higienização de ar-condicionado')).toBe(
      'Olá, Bujosa Clima! Gostaria de solicitar um orçamento de higienização de ar-condicionado.',
    );
  });

  it('mantém o texto genérico quando o cliente não escolheu serviço', () => {
    expect(buildGeneralQuoteMessage()).toBe(
      'Olá, Bujosa Clima! Gostaria de solicitar um orçamento.',
    );
  });

  it('monta a mensagem do formulário em linhas organizadas', () => {
    const message = buildQuoteMessage({
      name: '  Ana Souza ',
      whatsapp: '(21) 99999-9999',
      city: 'Niterói',
      service: 'Instalação de split',
      equipment: '',
      description: '  Instalar um split de 12.000 BTUs na sala.  ',
    });

    expect(message).toBe(
      [
        'Olá, Bujosa Clima! Gostaria de solicitar um orçamento.',
        '',
        'Nome: Ana Souza',
        'WhatsApp: (21) 99999-9999',
        'Cidade: Niterói',
        'Serviço desejado: Instalação de split',
        '',
        'Necessidade: Instalar um split de 12.000 BTUs na sala.',
      ].join('\n'),
    );
    expect(message).not.toContain('Modelo/capacidade');
  });

  it('inclui o equipamento quando informado', () => {
    const message = buildQuoteMessage({
      name: 'Carlos',
      whatsapp: '21988887777',
      city: 'Maricá',
      service: 'Manutenção preventiva e corretiva',
      equipment: 'LG Dual Inverter 9.000 BTUs',
      description: 'Equipamento com pouco rendimento.',
    });

    expect(message).toContain('Modelo/capacidade do equipamento: LG Dual Inverter 9.000 BTUs');
  });
});

describe('isWhatsAppConfigured', () => {
  it('indica o estado de configuração pendente', () => {
    expect(isWhatsAppConfigured(undefined)).toBe(false);
    expect(isWhatsAppConfigured('')).toBe(false);
    expect(isWhatsAppConfigured('5521999999999')).toBe(true);
  });
});
