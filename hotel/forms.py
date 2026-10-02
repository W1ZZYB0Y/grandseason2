from django import forms

from .models import Review


class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ["name", "email", "room", "rating", "comment"]
        widgets = {
            "name": forms.TextInput(attrs={
                "class": "form-control", "placeholder": "Your name",
            }),
            "email": forms.EmailInput(attrs={
                "class": "form-control", "placeholder": "Email (optional, kept private)",
            }),
            "room": forms.Select(attrs={"class": "form-select"}),
            "rating": forms.Select(attrs={"class": "form-select"}),
            "comment": forms.Textarea(attrs={
                "class": "form-control", "rows": 4,
                "placeholder": "Tell us about your stay...",
            }),
        }
        labels = {
            "room": "Which room did you stay in? (optional)",
        }

    def clean_comment(self):
        comment = self.cleaned_data["comment"].strip()
        if len(comment) < 5:
            raise forms.ValidationError("Please write a bit more about your experience.")
        return comment
