import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageSquare, User, Clock, Send, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  name: string;
  location: string;
  content: string;
  date: string;
  isGuest: boolean;
}

// Sample comments - in production these would come from a database
const sampleComments: Comment[] = [
  {
    id: "1",
    name: "Maria G.",
    location: "Salt Lake City, UT",
    content: "Alguien vino a mi puerta diciendo que era del gobierno. ¡Cuidado! El gobierno nunca vende filtros de agua.",
    date: "2024-01-15",
    isGuest: false
  },
  {
    id: "2",
    name: "Anonymous",
    location: "El Paso, TX",
    content: "Received a mail saying my water was contaminated. Called the city and they confirmed it was a scam.",
    date: "2024-01-10",
    isGuest: true
  },
  {
    id: "3",
    name: "Robert H.",
    location: "Atlanta, GA",
    content: "Watch out for people claiming to be EPA inspectors. Real inspectors don't try to sell you anything!",
    date: "2024-01-05",
    isGuest: false
  }
];

export function ScamCommentsSection() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [comments] = useState<Comment[]>(sampleComments);
  const [newComment, setNewComment] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestLocation, setGuestLocation] = useState("");

  const handleSubmitComment = () => {
    if (!newComment.trim()) {
      toast({
        title: language === "es" ? "Comentario vacío" : "Empty comment",
        description: language === "es" 
          ? "Por favor escribe un comentario antes de enviar."
          : "Please write a comment before submitting.",
        variant: "destructive"
      });
      return;
    }

    // In production, this would save to database
    toast({
      title: language === "es" ? "¡Gracias por tu reporte!" : "Thanks for your report!",
      description: language === "es"
        ? "Tu comentario será revisado y publicado pronto."
        : "Your comment will be reviewed and published soon."
    });
    
    setNewComment("");
    setGuestName("");
    setGuestLocation("");
  };

  return (
    <div className="space-y-6">
      {/* Submit Comment Section */}
      <Card className="border-secondary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            {language === "es" ? "Reporta una Estafa" : "Report a Scam"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {language === "es"
              ? "¿Has sido contactado por estafadores de agua? Comparte tu experiencia para ayudar a otros."
              : "Have you been contacted by water scammers? Share your experience to help others."
            }
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              placeholder={language === "es" ? "Tu nombre (opcional)" : "Your name (optional)"}
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />
            <Input
              placeholder={language === "es" ? "Tu ciudad/estado" : "Your city/state"}
              value={guestLocation}
              onChange={(e) => setGuestLocation(e.target.value)}
            />
          </div>
          
          <Textarea
            placeholder={language === "es" 
              ? "Describe la estafa que encontraste... ¿Qué dijeron? ¿Cómo te contactaron?"
              : "Describe the scam you encountered... What did they say? How did they contact you?"
            }
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
          
          <Button onClick={handleSubmitComment} className="w-full sm:w-auto">
            <Send className="h-4 w-4 mr-2" />
            {language === "es" ? "Enviar Reporte" : "Submit Report"}
          </Button>
        </CardContent>
      </Card>

      {/* Comments List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageSquare className="h-5 w-5 text-primary" />
            {language === "es" ? "Reportes de la Comunidad" : "Community Reports"}
            <span className="text-sm font-normal text-muted-foreground">
              ({comments.length})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {comments.map((comment) => (
            <div 
              key={comment.id} 
              className="p-4 bg-muted/50 rounded-lg border border-border"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">
                      {comment.name}
                      {comment.isGuest && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          ({language === "es" ? "Invitado" : "Guest"})
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">{comment.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {new Date(comment.date).toLocaleDateString(language === "es" ? "es-ES" : "en-US")}
                </div>
              </div>
              <p className="text-sm text-foreground/80 pl-10">
                {comment.content}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
