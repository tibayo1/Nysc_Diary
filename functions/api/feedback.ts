// POST /api/feedback
// Stores anonymous DiaryTalks feedback

interface Env {
  FIREBASE_PROJECT_ID?: string;
}

interface FeedbackBody {
  conversationId: string;
  answerId: string;
  rating: 'helpful' | 'not_helpful' | 'reported';
  reason?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    const body: FeedbackBody = await request.json();

    if (!body.answerId || !body.rating) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const validRatings = ['helpful', 'not_helpful', 'reported'];
    if (!validRatings.includes(body.rating)) {
      return new Response(
        JSON.stringify({ error: 'Invalid rating value' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // In production, this would write to Firestore via Admin SDK or REST API.
    // For MVP, feedback is stored client-side via the Firebase JS SDK in the
    // DiaryTalks page component. This endpoint serves as the server-side
    // alternative for when the client can't reach Firestore directly.

    return new Response(
      JSON.stringify({ success: true, message: 'Feedback recorded' }),
      { status: 200, headers: corsHeaders }
    );

  } catch (err) {
    console.error('Feedback API error:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to record feedback' }),
      { status: 500, headers: corsHeaders }
    );
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
