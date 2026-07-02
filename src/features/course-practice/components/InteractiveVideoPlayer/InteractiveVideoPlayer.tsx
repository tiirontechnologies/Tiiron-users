import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, Typography, Dialog, DialogContent, DialogActions, Button, CircularProgress } from '@mui/material';
import { COLORS, SHADOWS } from '../../constants';
import { transformApiQuestion } from '../../utils/transformApiResponse';
import { useSubmitPracticeSingleMutation } from '../../api/practiceApi';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

// Convert HH:MM:SS to seconds
const timeStringToSeconds = (timeStr: string) => {
  if (!timeStr) return 0;
  const parts = timeStr.split(':').map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return 0;
};

// Hook to load YT API
function useYouTubePlayer(videoUrl: string) {
  const [player, setPlayer] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // extract video id from full url
  const videoIdMatch = videoUrl ? videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/) : null;
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  useEffect(() => {
    if (!videoId) return;

    function initPlayer() {
      if (containerRef.current) {
        containerRef.current.innerHTML = '<div id="yt-player-container-inner" style="width:100%; height:100%;"></div>';
        
        new window.YT.Player('yt-player-container-inner', {
          videoId,
          playerVars: {
            enablejsapi: 1, 
            playsinline: 1,
            rel: 0
          },
          events: {
            onReady: (event: any) => {
              setPlayer(event.target);
            }
          }
        });
      }
    }

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

      const oldCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (oldCallback) oldCallback();
        initPlayer();
      };
    } else {
      initPlayer();
    }
  }, [videoId]);

  useEffect(() => {
    let interval: any;
    if (player && typeof player.getCurrentTime === 'function') {
      interval = setInterval(() => {
        // use getPlayerState to only update time when playing
        const state = player.getPlayerState ? player.getPlayerState() : -1;
        if (state === 1) { // 1 = playing
            setCurrentTime(player.getCurrentTime());
        }
      }, 500); 
    }
    return () => clearInterval(interval);
  }, [player]);

  return { player, currentTime, containerRef };
}

// Interactive Player Component
export default function InteractiveVideoPlayer({
  videoContentType,
  getUserAnswer,
  handleAnswerChange,
  renderQuestion
}: any) {
  const videoUrl = videoContentType?.video?.url || '';
  const { player, currentTime, containerRef } = useYouTubePlayer(videoUrl);
  
  const [activeGroupIndex, setActiveGroupIndex] = useState<number | null>(null);
  const [shownGroups, setShownGroups] = useState<Set<number>>(new Set());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [submitPracticeSingle, { isLoading: isSubmitting }] = useSubmitPracticeSingleMutation();
  const [feedback, setFeedback] = useState<{ isCorrect: boolean, score: number, correctAnswer?: any } | null>(null);

  // Check if we reached a timestamp
  useEffect(() => {
    if (!videoContentType?.questions || !player) return;

    videoContentType.questions.forEach((group: any, idx: number) => {
      if (shownGroups.has(idx)) return; // already solved/shown
      
      const targetTime = timeStringToSeconds(group.timestamp);
      // If we cross the target time
      if (currentTime >= targetTime && currentTime < targetTime + 2) {
        // Pause video
        if (player.pauseVideo) player.pauseVideo();
        // Show questions
        setActiveGroupIndex(idx);
        setCurrentQuestionIndex(0);
        setFeedback(null);
        // Mark as shown so we don't trigger it again immediately
        setShownGroups(prev => new Set(prev).add(idx));
      }
    });
  }, [currentTime, videoContentType?.questions, player, shownGroups]);

  const activeGroup = activeGroupIndex !== null ? videoContentType.questions[activeGroupIndex] : null;

  const handleContinue = useCallback(() => {
    setActiveGroupIndex(null);
    setCurrentQuestionIndex(0);
    setFeedback(null);
    if (player && player.playVideo) {
      player.playVideo();
    }
  }, [player]);

  const handleNextQuestion = useCallback(() => {
    if (activeGroup && currentQuestionIndex < activeGroup.questions.length - 1) {
       setCurrentQuestionIndex(prev => prev + 1);
       setFeedback(null);
    } else {
       handleContinue();
    }
  }, [activeGroup, currentQuestionIndex, handleContinue]);

  const handleSubmitQuestion = async () => {
    if (!activeGroup) return;
    const apiQ = activeGroup.questions[currentQuestionIndex];
    if (apiQ.questiontypeId === 7) {
       // Coding question: proceed directly without API submission since it's solved in an overlay
       handleNextQuestion();
       return;
    }

    const answer = getUserAnswer(videoContentType.id, apiQ.id.toString());
    const isMcq = apiQ.questiontypeId === 1 || apiQ.questiontypeId === 2;

    const selectedOptionId = isMcq
      ? (Array.isArray(answer) ? answer.map(Number) : (answer ? Number(answer) : undefined))
      : undefined;

    try {
      const res = await submitPracticeSingle({
        questionId: apiQ.id,
        selectedOptionId,
        userAnswer: !isMcq ? String(answer || "") : undefined,
        timeSpent: 10,
      }).unwrap();

      setFeedback({
         isCorrect: res.isCorrect,
         score: res.score,
         correctAnswer: res.correctAnswer,
      });
    } catch (err) {
      console.error("Failed to submit single question", err);
      // Fallback: proceed anyway if network error
      handleNextQuestion();
    }
  };


  return (
    <Box sx={{ position: 'relative', width: '100%', mb: { xs: 2, md: 2.5 } }}>
      {/* 16:9 Video Container */}
      <Box 
        sx={{ 
          position: "relative",
          width: "100%",
          paddingBottom: "56.25%", 
          overflow: "hidden",
          borderRadius: { xs: "8px", sm: "12px" },
          boxShadow: SHADOWS.md,
          backgroundColor: '#000'
        }}
      >
         <Box 
            ref={containerRef} 
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
         />
      </Box>

      {/* Pop-up dialog for questions */}
      <Dialog 
        open={activeGroupIndex !== null} 
        fullWidth 
        maxWidth="sm"
        PaperProps={{
          sx: {
            m: { xs: 1.5, sm: 3 },
            width: { xs: "calc(100% - 24px)", sm: "100%" },
            maxHeight: { xs: "calc(100% - 24px)", sm: "calc(100% - 64px)" },
          },
        }}
        // Force them to at least see the questions before continuing
      >
        <DialogContent
          sx={{
            minHeight: { xs: 'auto', sm: '300px' },
            p: { xs: 2, sm: 3 },
            overflowX: 'hidden',
          }}
        >
          {activeGroup && activeGroup.questions[currentQuestionIndex] && (
            <Box>
                <Typography variant="h6" sx={{ mb: { xs: 2, sm: 3 }, textAlign: 'center', fontWeight: 'bold', fontSize: { xs: "1rem", sm: "1.25rem" } }}>
                    Knowledge Check ({currentQuestionIndex + 1} of {activeGroup.questions.length})
                </Typography>
                
                {(() => {
                    const apiQ = activeGroup.questions[currentQuestionIndex];
                    const transformed = transformApiQuestion(apiQ);
                    const qId = apiQ.id.toString();
                    const userAnswer = getUserAnswer(videoContentType.id, qId);

                    return (
                        <Box
                          sx={{
                            mb: { xs: 2, sm: 4 },
                            p: { xs: 1.5, sm: 2 },
                            border: '1px solid #e5e7eb',
                            borderRadius: 2,
                            minWidth: 0,
                            overflow: 'hidden',
                          }}
                        >
                            {apiQ.title && (
                                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                                    {apiQ.title}
                                </Typography>
                            )}
                            <Box sx={{ pointerEvents: feedback ? 'none' : 'auto', opacity: feedback ? 0.7 : 1 }}>
                                {renderQuestion(apiQ, transformed, userAnswer, (ans: any) => handleAnswerChange(videoContentType.id, qId, ans))}
                            </Box>
                            
                            {feedback && (() => {
                                const yourAnswerText = apiQ.mcq?.options
                                  ? Array.isArray(userAnswer)
                                    ? userAnswer
                                        .map((a: any) => apiQ.mcq.options.find((o: any) => o.id === Number(a))?.text)
                                        .filter(Boolean)
                                        .join(', ')
                                    : apiQ.mcq.options.find((o: any) => o.id === Number(userAnswer))?.text || String(userAnswer)
                                  : String(userAnswer);
                                const correctAnswerText = apiQ.mcq?.options
                                  ? apiQ.mcq.options.filter((o: any) => o.isCorrect).map((o: any) => o.text).join(', ')
                                  : typeof feedback.correctAnswer === 'string'
                                    ? feedback.correctAnswer
                                    : JSON.stringify(feedback.correctAnswer);

                                return (
                                  <Box
                                    sx={{
                                      mt: { xs: 2, sm: 3 },
                                      p: { xs: 1.5, sm: 2 },
                                      borderRadius: 2,
                                      backgroundColor: feedback.isCorrect ? '#f0fdf4' : '#fef2f2',
                                      border: `1px solid ${feedback.isCorrect ? '#bbf7d0' : '#fecaca'}`,
                                      display: 'grid',
                                      gap: 1,
                                      minWidth: 0,
                                      overflowWrap: 'anywhere',
                                    }}
                                  >
                                      <Box
                                        sx={{
                                          display: 'flex',
                                          alignItems: { xs: 'flex-start', sm: 'center' },
                                          justifyContent: 'space-between',
                                          gap: 1,
                                          flexDirection: { xs: 'column', sm: 'row' },
                                          minWidth: 0,
                                        }}
                                      >
                                        <Typography
                                          variant="subtitle2"
                                          sx={{ color: feedback.isCorrect ? '#166534' : '#991b1b', fontWeight: 'bold' }}
                                        >
                                            {feedback.isCorrect ? "Correct!" : "Incorrect"}
                                        </Typography>
                                        <Typography variant="body2" sx={{ flexShrink: 0 }}>
                                            Score: <strong>{feedback.score}</strong> / {apiQ.score || 1}
                                        </Typography>
                                      </Box>

                                      <Typography variant="body2" sx={{ minWidth: 0, lineHeight: 1.5 }}>
                                          Your Answer: <Box component="strong" sx={{ wordBreak: 'break-word' }}>{yourAnswerText || '-'}</Box>
                                      </Typography>

                                      <Typography variant="body2" sx={{ minWidth: 0, lineHeight: 1.5, color: '#166534' }}>
                                          Correct Answer: <Box component="strong" sx={{ wordBreak: 'break-word' }}>{correctAnswerText || '-'}</Box>
                                      </Typography>
                                  </Box>
                                );
                            })()}
                        </Box>
                    );
                })()}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: { xs: 2, sm: 2 }, pt: 0, justifyContent: 'center' }}>
            {feedback ? (
               <Button variant="contained" color="primary" onClick={handleNextQuestion} sx={{ minWidth: { xs: 0, sm: 200 }, width: { xs: "100%", sm: "auto" } }}>
                   {activeGroup && currentQuestionIndex < activeGroup.questions.length - 1 ? "Next Question" : "Continue Video"}
               </Button>
            ) : (
               <Button variant="contained" color="primary" onClick={handleSubmitQuestion} disabled={isSubmitting} sx={{ minWidth: { xs: 0, sm: 200 }, width: { xs: "100%", sm: "auto" } }}>
                   {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Submit"}
               </Button>
            )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
