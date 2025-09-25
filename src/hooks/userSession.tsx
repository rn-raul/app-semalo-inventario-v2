import { useRef, useCallback } from 'react';
import api from '@services/api';

export const useSessionRenewal = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Função para renovar a sessão silenciosamente
  const renewSession = useCallback(async () => {
    try {
      // Fazer uma requisição leve apenas para renovar a sessão
     const response = await api.get("/service.sbr?serviceName=DatasetSP.getStructure&outputType=json");
     console.log(response.data);
      console.log('Sessão renovada automaticamente em:', new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Erro ao renovar sessão:', error);
      
    }
  }, []);

  // Função para iniciar a renovação automática da sessão
  const startSessionRenewal = useCallback(() => {
    // Limpar intervalo anterior se existir
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    console.log('Iniciando renovação automática da sessão...');
    // Renovar a cada 1 minuto (60000ms)
    intervalRef.current = setInterval(renewSession, 60000);
  }, [renewSession]);

  // Função para parar a renovação automática
  const stopSessionRenewal = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      console.log('Renovação automática da sessão interrompida');
    }
  }, []);

  // Cleanup function para ser usada em useEffect
  const cleanup = useCallback(() => {
    stopSessionRenewal();
  }, [stopSessionRenewal]);

  return {
    startSessionRenewal,
    stopSessionRenewal,
    renewSession,
    cleanup
  };
};